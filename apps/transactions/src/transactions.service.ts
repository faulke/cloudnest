import { API_SERVICE } from '@lib/clients'
import { Account, Transaction } from '@lib/models'
import { PlaidService } from '@lib/plaid'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { RemovedTransaction } from 'plaid'
import { lastValueFrom } from 'rxjs'
import { In, Repository, UpdateResult } from 'typeorm'
import { TransactionSchema } from './transaction.entity'
import { mapTransactions } from './utils'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionSchema, 'transactions-db')
    private transactionsRepo: Repository<Transaction>,
    // transactions should have it's own Plaid client
    private readonly plaid: PlaidService,
    @Inject(API_SERVICE) private apiClient: ClientProxy
  ) {}

  createOrUpdateMany(transactions: Transaction[]): Promise<Transaction[]> {
    return this.transactionsRepo.save(transactions)
  }

  update(transaction: Transaction): Promise<UpdateResult> {
    return this.transactionsRepo.update({ plaidId: transaction.plaidId }, transaction)
  }

  getTransactions(): Promise<Transaction[]> {
    return this.transactionsRepo.find()
  }

  async updateTransactions(itemId: string, token: string, startCursor?: string) {
    let cursor = startCursor

    // New transaction updates since "cursor"
    let added: Array<Transaction> = []
    let modified: Array<Transaction> = []
    // Removed transaction ids
    let removed: Array<RemovedTransaction> = []
    let hasMore = true

    // fetch accounts for item from api via microservice
    const res = this.apiClient.send('item:accounts', { itemId })
    const accounts: Account[] = await lastValueFrom(res)

    const plaidAccounts = accounts.reduce((p, account) => {
      p[account.plaidId] = account.id
      return p
    }, {})

    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      try {
        const data = await this.plaid.syncTransactions(token, cursor)
        // Add this page of results
        added = added.concat(mapTransactions(data.added, plaidAccounts))
        modified = modified.concat(mapTransactions(data.modified, plaidAccounts))
        removed = removed.concat(data.removed)
        hasMore = data.has_more
        // Update cursor to the next cursor
        cursor = data.next_cursor
      } catch (error) {
        console.log(error)
        hasMore = false
      }
    }

    // combine new and modified - it will create or update existing
    added.concat(modified)

    try {
      await this.createOrUpdateMany(added)
    } catch (error) {
      console.log(error)
    }

    // removeTransactions(removed) - remove by plaidId

    this.apiClient.emit('items:update_cursor', { itemId, cursor })
  }

  deleteForAccounts(accountIds: string[]) {
    return this.transactionsRepo
      .createQueryBuilder()
      .delete()
      .where({ accountId: In([...accountIds]) })
      .execute()
  }
}

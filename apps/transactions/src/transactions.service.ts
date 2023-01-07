import { Transaction } from '@lib/models'
import { PlaidService } from '@lib/plaid'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RemovedTransaction } from 'plaid'
import { Repository, UpdateResult } from 'typeorm'
import { TransactionSchema } from './transaction.entity'
import { mapTransactions } from './utils'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionSchema, 'transactions-db')
    private transactionsRepo: Repository<Transaction>,
    // transactions should have it's own Plaid client
    private readonly plaid: PlaidService
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

  async updateTransactions(token: string, startCursor?: string) {
    let cursor = startCursor

    // New transaction updates since "cursor"
    let added: Array<Transaction> = []
    let modified: Array<Transaction> = []
    // Removed transaction ids
    let removed: Array<RemovedTransaction> = []
    let hasMore = true

    // fetch accounts for item from api


    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      try {
        const data = await this.plaid.syncTransactions(token, cursor)
        // Add this page of results
        added = added.concat(mapTransactions(data.added))
        modified = modified.concat(mapTransactions(data.modified))
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
      const res = await this.createOrUpdateMany(added)
    } catch (error) {
      console.log(error)
    }

    // removeTransactions(removed) - remove by plaidId

    // save cursor for item
    // emit ms event picked up by item controller

  }
}

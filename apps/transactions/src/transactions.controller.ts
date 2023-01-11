import { Controller, Get } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { TransactionsService } from './transactions.service'

@Controller()
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
  ) {}

  @Get()
  async getTransactions() {
    const txns = await this.transactionsService.getTransactions()
    console.log(txns.length)
    return txns
  }

  // start with the event pattern for microservices
  // move to worker processing events from queue

  @EventPattern('sync_transactions')
  async syncTransactions(req: { token: string, itemId: string, cursor?: string }) {
    const { token, cursor, itemId } = req
    console.log('RECEIVED REQUEST: ', req)
    // need some logs here

    await this.transactionsService.updateTransactions(itemId, token, cursor)

    return {}
  }

  @EventPattern('delete_transactions')
  async deleteTransactions(req: { accountIds: string[] }) {
    const res = await this.transactionsService.deleteForAccounts(req.accountIds)
    console.log('DELETED:', res.affected)
  }
}

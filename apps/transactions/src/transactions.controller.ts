import { Controller, Get } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { PlaidService } from '@lib/plaid'

@Controller()
export class TransactionsController {
  constructor(
    // private readonly transactionsService: TransactionsService,
    private readonly plaid: PlaidService
  ) {}

  @Get()
  async getTransactions() {
    // getTransactions should be a regular api endpoint that fetches them from ravendb
  }

  // start with the event pattern for microservices
  // move to worker processing events from queue

  @EventPattern('sync_transactions')
  async syncTransactions(token: string) {
    console.log(token)
    // try {
    //   const txns = await this.plaid.getTransactions(token)
    //   console.log(txns.transactions.length)
    // } catch (error) {
    //   console.log(error)
    // }

    return {}
  }
}

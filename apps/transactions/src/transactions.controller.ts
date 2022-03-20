import { Controller, Get } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { TransactionsService } from './transactions.service'
import { RavendbService } from '@lib/ravendb'
import { PlaidService } from '@lib/plaid'

@Controller()
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly ravendb: RavendbService,
    private readonly plaid: PlaidService
  ) {}

  @Get()
  async getTransactions() {
    // getTransactions should be a regular api endpoint that fetches them from ravendb
  }

  // start with the event pattern for microservices
  // move to worker processing events from queue

  @MessagePattern({ cmd: 'get_transactions' })
  async syncTransactions(token: string) {
    try {
      const txns = await this.plaid.getTransactions(token)
      console.log(txns.transactions.length)
    } catch (error) {
      console.log(error)
    }

    return {}
  }
}

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
    return txns
  }

  @Get('/test')
  async test() {
    const txns = await this.transactionsService.createOrUpdateMany([
      JSON.parse('{"_id":"63b9d5c91c965b430da7a349","plaidId":"qLlagXn5w1todvNemGMLU1gx47RLaLCVkgW9v","plaidAccountId":"jjpKQZo3Emf7qvbGW6zjUVvbZy4EawuZrba1P","category":"Food and Drink,Restaurants,Fast Food","type":"in store","name":"McDonald\'s","currencyCode":"USD","accountOwner":null,"pending":false,"amount":12,"date":"2022-10-29"}')
    ])
    console.log(txns)
    return txns
  }

  // start with the event pattern for microservices
  // move to worker processing events from queue

  @EventPattern('sync_transactions')
  async syncTransactions(req: { token: string, cursor?: string }) {
    const { token, cursor } = req
    console.log('RECEIVED REQUEST: ', req)
    // need some logs here

    await this.transactionsService.updateTransactions(token, cursor)

    return {}
  }
}

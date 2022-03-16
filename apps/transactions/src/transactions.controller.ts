import { Controller, Get } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { TransactionsService } from './transactions.service'
import { RavendbService } from '@lib/ravendb'

@Controller()
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly ravendb: RavendbService
  ) {}

  @Get()
  getHello(): string {
    return this.transactionsService.getHello()
  }

  @MessagePattern({ cmd: 'get_transactions' })
  async accumulate(data: { userId: string; itemId: string }): Promise<any> {
    // add filtering, sorting?
    console.log(await this.ravendb.listDocuments())
    return data
  }
}

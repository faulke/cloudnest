import { Controller, Get } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { TransactionsService } from './transactions.service'

@Controller()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  getHello(): string {
    return this.transactionsService.getHello()
  }

  @MessagePattern({ cmd: 'sum' })
  async accumulate(data: number[]): Promise<number> {
    return (data || []).reduce((a, b) => a + b)
  }
}

import { Injectable } from '@nestjs/common'

@Injectable()
export class TransactionsService {
  getHello(): string {
    return 'Hello from transactions http'
  }
}

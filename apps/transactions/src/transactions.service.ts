import { Transaction } from '@lib/models'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TransactionSchema } from './transaction.entity'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionSchema, 'mongodb')
    private transactionsRepo: Repository<Transaction>
  ) {}

  getTransactions(): string {
    return 'Hello from transactions http'
  }
}

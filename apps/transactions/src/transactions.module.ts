import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TransactionsController } from './transactions.controller'
import { TransactionsService } from './transactions.service'
import { TransactionSchema } from './transaction.entity'
import { PlaidService } from '@lib/plaid'
import { ApiClient } from '@lib/clients'

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionSchema], 'transactions-db'),
    ApiClient
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, PlaidService]
})
export class TransactionsModule {}

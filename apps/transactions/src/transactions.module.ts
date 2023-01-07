import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { TransactionsController } from './transactions.controller'
import { TransactionsService } from './transactions.service'
import { TransactionSchema } from './transaction.entity'
import { PlaidService } from '@lib/plaid'

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionSchema], 'mongodb'),
    ConfigModule
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, PlaidService]
})
export class TransactionsModule {}

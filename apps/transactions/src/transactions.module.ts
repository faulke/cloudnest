import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TransactionsController } from './transactions.controller'
import { TransactionsService } from './transactions.service'
import { RavendbService } from '@lib/ravendb'
import { PlaidService } from '@lib/plaid'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [TransactionsController],
  providers: [TransactionsService, RavendbService, PlaidService]
})
export class TransactionsModule {}

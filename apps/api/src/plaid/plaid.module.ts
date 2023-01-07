import { Module } from '@nestjs/common'
import { PlaidModule as PlaidLib } from '@lib/plaid'
import { ItemsModule as ItemsLib } from '@lib/items'
import { AccountsModule as AccountsLib } from '@lib/accounts'
import { PlaidController } from './plaid.controller'
import { TransactionsClient } from '@lib/clients'

@Module({
  imports: [
    ItemsLib,
    PlaidLib,
    AccountsLib,
    TransactionsClient
  ],
  controllers: [PlaidController],
  providers: []
})
export class PlaidModule {}

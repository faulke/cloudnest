import { Module } from '@nestjs/common'
import { ItemsModule as ItemsLib } from '@lib/items'
import { PlaidModule as PlaidLib } from '@lib/plaid'
import { TransactionsClient } from '@lib/clients'
import { ItemsController } from './items.controller'

@Module({
  imports: [
    TransactionsClient,
    ItemsLib,
    PlaidLib
  ],
  controllers: [ItemsController]
})
export class ItemsModule {}

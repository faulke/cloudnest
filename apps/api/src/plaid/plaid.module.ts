import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PlaidModule as PlaidLib } from '@lib/plaid'
import { ItemsModule as ItemsLib } from '@lib/items'
import { AccountsModule as AccountsLib } from '@lib/accounts'
import { PlaidController } from './plaid.controller'

@Module({
  imports: [ConfigModule, ItemsLib, PlaidLib, AccountsLib],
  controllers: [PlaidController],
  providers: []
})
export class PlaidModule {}

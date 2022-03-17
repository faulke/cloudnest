import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PlaidModule as PlaidLib } from '@lib/plaid'
import { ItemsModule as ItemsLib } from '@lib/items'
import { PlaidController } from './plaid.controller'

@Module({
  imports: [ConfigModule, ItemsLib, PlaidLib],
  controllers: [PlaidController],
  providers: []
})
export class PlaidModule {}

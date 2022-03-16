import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PlaidService } from './plaid.service'
import { PlaidController } from './plaid.controller'
import { ItemsModule } from '@lib/items'

@Module({
  imports: [ConfigModule, ItemsModule],
  controllers: [PlaidController],
  providers: [PlaidService]
})
export class PlaidModule {}

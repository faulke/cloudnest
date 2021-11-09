import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PlaidService } from './plaid.service'
import { PlaidController } from './plaid.controller'

@Module({
  imports: [ConfigModule],
  controllers: [PlaidController],
  providers: [PlaidService]
})
export class PlaidModule {}

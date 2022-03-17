import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PlaidService } from './plaid.service'

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [PlaidService],
  exports: [PlaidService]
})
export class PlaidModule {}

import { Module } from '@nestjs/common'
import { AccountsModule as AccountsLib } from '@lib/accounts'
import { AccountsController } from './accounts.controller'

@Module({
  imports:[
    AccountsLib
  ],
  controllers: [AccountsController]
})
export class AccountsModule {}

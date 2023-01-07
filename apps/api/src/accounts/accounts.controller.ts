import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { AccountsService } from '@lib/accounts'
import { MessagePattern } from '@nestjs/microservices'
import { Account } from '@lib/models'

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @MessagePattern('item:accounts')
  async getAccountsForItem(itemId: string): Promise<Account[]> {
    return this.accountsService.getAccountsForItem(itemId)
  }
}

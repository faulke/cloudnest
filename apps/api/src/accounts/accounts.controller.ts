import { Controller, Get } from '@nestjs/common'
import { AccountsService } from './accounts.service'
import { MessagePattern } from '@nestjs/microservices'
import { Account } from '@lib/models'

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @MessagePattern('item:accounts')
  async getAccountsForItem(req: { itemId: string }): Promise<Account[]> {
    return this.accountsService.getAccountsForItem(req.itemId)
  }

  @Get()
  getAccounts() {}
}

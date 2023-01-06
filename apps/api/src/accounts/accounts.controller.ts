import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { AccountsService } from '@lib/accounts'

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}
}

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Account } from '@lib/models'
import { AccountSchema } from './account.entity'

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(AccountSchema)
    private accountsRepo: Repository<Account>
  ) {}

  createOrUpdateMany(accounts: Account[]): Promise<Account[]> {
    return this.accountsRepo.save(accounts)
  }

  getAccountsForItem(itemId: string): Promise<Account[]> {
    return this.accountsRepo.find({ where: { itemId } })
  }
}

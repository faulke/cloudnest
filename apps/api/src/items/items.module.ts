import { Module } from '@nestjs/common'
import { ItemsService } from './items.service'
import { TransactionsClient } from '@lib/clients'
import { PlaidModule } from '@lib/plaid'
import { ItemsController } from './items.controller'
import { ItemSubscriber } from './items.subcriber'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ItemSchema } from './item.entity'
import { AccountsModule } from '../accounts/accounts.module'

@Module({
  imports: [
    TransactionsClient,
    PlaidModule,
    AccountsModule,
    TypeOrmModule.forFeature([ItemSchema])
  ],
  controllers: [ItemsController],
  providers: [ItemsService, ItemSubscriber],
  exports: [ItemsService]
})
export class ItemsModule {}

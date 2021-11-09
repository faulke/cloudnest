import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TransactionsController } from './transactions.controller'
import { TransactionsService } from './transactions.service'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionsModule {}

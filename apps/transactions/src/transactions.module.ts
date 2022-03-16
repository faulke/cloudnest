import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TransactionsController } from './transactions.controller'
import { TransactionsService } from './transactions.service'
import { RavendbService } from '@lib/ravendb'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [TransactionsController],
  providers: [TransactionsService, RavendbService]
})
export class TransactionsModule {}

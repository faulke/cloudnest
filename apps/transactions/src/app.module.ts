import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TransactionsModule } from './transactions.module'
import { TransactionSchema } from './transaction.entity'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      name: 'mongodb',
      type: 'mongodb',
      host: 'mongo',
      port: 27017,
      database: 'dev',
      username: 'root',
      password: 'example',
      entities: [TransactionSchema],
      synchronize: true,
      authSource: 'admin'
    }),
    TransactionsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

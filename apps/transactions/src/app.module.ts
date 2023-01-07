import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TransactionsModule } from './transactions.module'
import { TransactionSchema } from './transaction.entity'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      name: 'transactions-db',
      type: 'postgres',
      host: 'transactions-db',
      port: parseInt(process.env.POSTGRES_PORT, 10),
      database: 'dev',
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      entities: [TransactionSchema],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy()
    }),
    TransactionsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

import { NestFactory } from '@nestjs/core'
import { TransactionsModule } from './transactions.module'

async function bootstrap() {
  const app = await NestFactory.create(TransactionsModule)
  const port = process.env.TRANSACTIONS_PORT
  console.log('Starting transactions servie on port:', port)
  await app.listen(port)
}
bootstrap()

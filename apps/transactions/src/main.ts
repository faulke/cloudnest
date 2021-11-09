import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { TransactionsModule } from './transactions.module'

async function bootstrap() {
  const app = await NestFactory.create(TransactionsModule)
  const port = process.env.TRANSACTIONS_PORT
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 3000,
      host: '0.0.0.0'
    }
  })

  await app.startAllMicroservices()
  await app.listen(port)
}
bootstrap()

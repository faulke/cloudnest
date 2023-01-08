import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({ origin: '*' })
  const port = process.env.API_PORT
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: process.env.API_MS_PORT,
      host: '0.0.0.0'
    }
  })

  await app.startAllMicroservices()
  await app.listen(port)
}
bootstrap()

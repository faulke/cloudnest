import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = process.env.API_PORT
  console.log('Starting API on port:', port)
  await app.listen(port)
}
bootstrap()

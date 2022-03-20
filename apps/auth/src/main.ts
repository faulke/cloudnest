import { NestFactory } from '@nestjs/core'
import { AuthModule } from './auth.module'

async function bootstrap() {
  const app = await NestFactory.create(AuthModule)
  app.enableCors({ origin: '*' })
  const port = process.env.AUTH_PORT
  console.log('Starting AUTH on port:', port)
  await app.listen(port)
}
bootstrap()

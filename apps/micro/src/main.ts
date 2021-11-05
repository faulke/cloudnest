import { NestFactory } from '@nestjs/core'
import { MicroModule } from './micro.module'

async function bootstrap() {
  const app = await NestFactory.create(MicroModule)
  const port = process.env.MICRO_PORT
  console.log('Starting microservice on port:', port)
  await app.listen(port)
}
bootstrap()

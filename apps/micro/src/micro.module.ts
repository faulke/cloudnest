import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MicroController } from './micro.controller'
import { MicroService } from './micro.service'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [MicroController],
  providers: [MicroService],
})
export class MicroModule {}

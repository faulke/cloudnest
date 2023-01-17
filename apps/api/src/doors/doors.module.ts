import { Module } from '@nestjs/common'
import { DoorsService } from './doors.service'
import { DoorsController } from './doors.controller'

@Module({
  controllers: [DoorsController],
  providers: [DoorsService]
})
export class DoorsModule {}

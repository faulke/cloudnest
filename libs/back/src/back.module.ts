import { Module } from '@nestjs/common';
import { BackService } from './back.service';

@Module({
  providers: [BackService],
  exports: [BackService],
})
export class BackModule {}

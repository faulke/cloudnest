import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ItemsService } from './items.service'
import { ItemSchema } from './item.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ItemSchema])],
  providers: [ItemsService],
  exports: [ItemsService]
})
export class ItemsModule {}

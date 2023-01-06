import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ItemsService } from './items.service'
import { ItemSchema } from './item.entity'
import { ItemSubscriber } from './items.subcriber'

@Module({
  imports: [TypeOrmModule.forFeature([ItemSchema])],
  providers: [ItemsService, ItemSubscriber],
  exports: [ItemsService]
})
export class ItemsModule {}

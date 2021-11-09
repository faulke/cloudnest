import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ItemsService, ItemSchema, ItemSubscriber } from '@lib/items'
import { ItemsController } from './items.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemSchema]),
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'transactions'
        }
      }
    ])
  ],
  controllers: [ItemsController],
  providers: [ItemsService, ItemSubscriber]
})
export class ItemsModule {}

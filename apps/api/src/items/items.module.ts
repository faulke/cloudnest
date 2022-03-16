import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ItemsModule as ItemsLib } from '@lib/items'
import { ItemsController } from './items.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'transactions'
        }
      }
    ]),
    ItemsLib
  ],
  controllers: [ItemsController]
})
export class ItemsModule {}

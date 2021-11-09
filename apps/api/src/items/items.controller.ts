import { Controller, Get, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { ItemsService } from '@lib/items'

@Controller('items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    @Inject('MATH_SERVICE') private client: ClientProxy
  ) {}

  @Get()
  async getItems() {
    return {
      data: await this.itemsService.findAll()
    }
  }

  @Get('/create')
  async createItem() {
    return {
      data: await this.itemsService.create({
        id: 'test_id4',
        token: 'test_token',
        userId: '589a682e-47a8-4bfb-aeb6-cb3e9954dea1'
      })
    }
  }

  @Get('/micro')
  sendMessage() {
    const pattern = { cmd: 'sum' }
    const payload = [1, 2, 3]
    return this.client.send<number>(pattern, payload)
  }
}

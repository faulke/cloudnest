import { Controller, Get, Post, Body, Inject } from '@nestjs/common'
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
        itemId: 'test_id4',
        token: 'test_token',
        userId: '589a682e-47a8-4bfb-aeb6-cb3e9954dea1'
      })
    }
  }

  @Get('/micro')
  sendMessage() {
    const pattern = { cmd: 'get_transactions' }
    const payload = {
      userId: '589a682e-47a8-4bfb-aeb6-cb3e9954dea1',
      itemId: 'test_item_id'
    }
    return this.client.send<Promise<any>>(pattern, payload)
  }

  @Post('/hooks')
  async handleWebhook(@Body() payload: any) {
    // drop in queue to be processed by transactions worker
    console.log(payload)
    return '200'
  }
}

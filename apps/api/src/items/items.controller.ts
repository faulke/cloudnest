import { Controller, Get, Post, Body, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'
import { DefaultUpdateWebhook } from 'plaid'
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
  async handleWebhook(@Body() payload: DefaultUpdateWebhook) {
    // drop in queue to be processed by transactions worker
    // for now just send message to transactions service
    const pattern = { cmd: 'get_transactions' }
    const { item_id: itemId } = payload
    console.log(payload)
    const item = await this.itemsService.findByPlaidId(itemId)

    const obs = this.client.send<any>(pattern, item.token)
    const res = await lastValueFrom(obs)
    console.log(res)
    return { data: res }
  }
}

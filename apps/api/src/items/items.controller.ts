import { Controller, Get, Post, Body, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
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

  @Post('/hooks')
  async handleWebhook(@Body() payload: DefaultUpdateWebhook) {
    const { item_id: itemId } = payload
    console.log(payload)
    const item = await this.itemsService.findByPlaidId(itemId)

    // emit event to websocket to fetch new transactions for item




    // create/update accounts
    // create transactions
    // remove transactions
    // emit event

    // transactions by account
    // transactions by door

    // transaction tags = [...ids]
    // transaction account_id
    // transaction door(s) = [...ids]

    // single family = 1 door

    // multi = [doors]

    // one transaction for multiple doors? split?

    return { }
  }
}

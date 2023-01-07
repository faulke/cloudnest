import { Controller, Get, Post, Body, Inject, Delete, Param } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { DefaultUpdateWebhook } from 'plaid'
import { ItemsService } from '@lib/items'
import { PlaidService } from '@lib/plaid'
import { TRANSACTIONS_SERVICE } from '@lib/clients'

@Controller('items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly plaidService: PlaidService,
    @Inject(TRANSACTIONS_SERVICE) private txnsClient: ClientProxy
  ) {}

  @Get()
  async getItems() {
    return {
      data: await this.itemsService.findAll()
    }
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: string) {
    try {
      // get item using plaidId
      const item = await this.itemsService.findById(id)

      // remove from plaid
      await this.plaidService.removeItem(item.token)

      // delete from db
      const res = await this.itemsService.delete(id)

      return { removed: res.affected > 0 }
    } catch (error) {
      console.log(error)
      return { removed: false }
    }
  }

  @Post('/hooks')
  async handleWebhook(@Body() payload: DefaultUpdateWebhook) {
    const { item_id: itemId, webhook_code: code } = payload
    console.log(code)
    if (code === 'SYNC_UPDATES_AVAILABLE') {
      console.log(payload)
      const item = await this.itemsService.findByPlaidId(itemId)
      console.log(item)
  
      // need to provide token and cursor
      this.txnsClient.emit('sync_transactions', { token: item.token, cursor: item.lastCursor })
    }


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

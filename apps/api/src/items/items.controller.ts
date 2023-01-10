import { Controller, Get, Post, Body, Inject, Delete, Param, Req } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { DefaultUpdateWebhook } from 'plaid'
import { ItemsService } from './items.service'
import { PlaidService } from '@lib/plaid'
import { TRANSACTIONS_SERVICE } from '@lib/clients'
import { LinkTokenRequest, LinkTokenResponse } from '@lib/plaid'
import { mapAccounts } from '../accounts/utils'
import { AccountsService } from '../accounts/accounts.service'
import { Request } from 'express'

@Controller('items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly plaidService: PlaidService,
    private readonly accountsService: AccountsService,
    @Inject(TRANSACTIONS_SERVICE) private txnsClient: ClientProxy
  ) {}

  @Get()
  async getItems(@Req() request: any) { // need to use RequestContext
    return {
      data: await this.itemsService.findAll(request.userId)
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

  @Post('/link-token')
  async getLinkToken(@Body() request: LinkTokenRequest) {
    // this can be taken from auth middleware later
    const { userId } = request
    const { link_token } = await this.plaidService.linkTokenCreate(userId)
    const data: LinkTokenResponse = {
      linkToken: link_token
    }

    return { data }
  }

  @Post('/exchange-token')
  async exchangeToken(@Body() request) {
    const start = performance.now()

    // use auth middleware to get userId
    // userId added in auth0 action after login
    const { token, institutionId, userId } = request
    const res = await this.plaidService.exchangePublicToken(token)
    const { access_token: accessToken, item_id: itemId } = res
    // create item in db
    const item = await this.itemsService.create({
      token: accessToken,
      plaidId: itemId,
      userId,
      institutionId
    })

    const accountsRes = await this.plaidService.getAccountsForItem(accessToken)
    const accounts = mapAccounts(accountsRes.accounts, userId, item.plaidId)

    // create accounts in db
    const updated = await this.accountsService.createOrUpdateMany(accounts)

    this.txnsClient.emit('sync_transactions', { token: accessToken, itemId })

    // simulate sync available webhook for sandbox env
    this.plaidService.fireWebhook(accessToken)

    const end = performance.now()
    console.log('PERFORMANCE', end - start)

    return {
      data: updated
    }
  }

  // list items in ui
  // fire webhook button for item
  @Post('/hooks/test')
  async testWebhook(@Body() req) {
    const { token } = req
    return await this.plaidService.fireWebhook(
      token
    )
  }

  @Post('/hooks')
  async handleWebhook(@Body() payload: DefaultUpdateWebhook) {
    const { item_id: itemId, webhook_code: code } = payload

    if (code === 'SYNC_UPDATES_AVAILABLE') {
      const item = await this.itemsService.findByPlaidId(itemId)
  
      this.txnsClient.emit('sync_transactions', { token: item.token, cursor: item.lastCursor })
    }

    return { }
  }
}

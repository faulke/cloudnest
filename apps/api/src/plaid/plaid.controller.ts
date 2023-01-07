import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ItemsService } from '@lib/items'
import { PlaidService } from '@lib/plaid'
import { LinkTokenRequest, LinkTokenResponse } from './plaid.dto'
import { AccountsService, mapAccounts } from '@lib/accounts'
import { ClientProxy } from '@nestjs/microservices'
import { TRANSACTIONS_SERVICE } from '@lib/clients'

@Controller('plaid')
export class PlaidController {
  constructor(
    @Inject(TRANSACTIONS_SERVICE) private txnsClient: ClientProxy,
    private readonly plaidService: PlaidService,
    private readonly itemsService: ItemsService,
    private readonly accountsService: AccountsService,
  ) {}

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
    // use auth middleware to get userId
    // userId added in auth0 action after login
    const { token, institutionId, userId } = request
    const res = await this.plaidService.exchangePublicToken(token)
    const { access_token: accessToken, item_id: itemId } = res
    // create item in db
    await this.itemsService.create({
      token: accessToken,
      itemId,
      userId,
      institutionId
    })

    const accountsRes = await this.plaidService.getAccountsForItem(accessToken)
    const accounts = mapAccounts(accountsRes.accounts, userId, itemId)

    // create accounts in db
    const updated = await this.accountsService.createOrUpdateMany(accounts)

    this.txnsClient.emit('sync_transactions', { token: accessToken })

    // simulate sync available webhook for sandbox env
    this.plaidService.fireWebhook(accessToken)

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
}

import { Body, Controller, Post } from '@nestjs/common'
import { ItemsService } from '@lib/items'
import { PlaidService } from '@lib/plaid'
import { LinkTokenRequest, LinkTokenResponse } from './plaid.dto'
import { AccountsService, mapAccounts } from '@lib/accounts'

@Controller('plaid')
export class PlaidController {
  constructor(
    private readonly plaidService: PlaidService,
    private readonly itemsService: ItemsService,
    private readonly accountsService: AccountsService
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
    const item = await this.itemsService.create({
      token: accessToken,
      itemId,
      userId,
      institutionId
    })

    const accountsRes = await this.plaidService.getAccountsForItem(accessToken)
    const accounts = mapAccounts(accountsRes.accounts, userId)

    // create accounts in db
    const updated = await this.accountsService.createOrUpdateMany(accounts)
    // redirect client to new accounts, but still fetching transactions

    // get transactions for item
    // create/update transactions in db
    // emit websocket that transactions are ready

    // return accounts data
    // - institution data + accounts list

    return {
      data: updated
    }
  }

  @Post('/hooks/test')
  async testWebhook() {
    return await this.plaidService.fireWebhook(
      ''
    )
  }
}

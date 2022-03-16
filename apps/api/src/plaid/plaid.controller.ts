import { Body, Controller, Post } from '@nestjs/common'
import { PlaidService } from './plaid.service'
import { LinkTokenRequest, LinkTokenResponse } from './plaid.dto'
import { ItemsService } from '@lib/items'

@Controller('plaid')
export class PlaidController {
  constructor(
    private readonly plaidService: PlaidService,
    private readonly itemsService: ItemsService
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
    const res = await this.plaidService.exchangePublicToken(request.token)
    console.log(request)
    // create item in db
    const item = await this.itemsService.create({
      token: res.access_token,
      itemId: res.item_id,
      userId: request.userId
    })

    console.log(item)

    return {
      data: item
    }
  }

  @Post('/hooks/test')
  async testWebhook() {
    return await this.plaidService.fireWebhook(
      'access-sandbox-5fe59bac-355d-4787-94ec-f4052d8bd7cb'
    )
  }
}

import { Controller, Get } from '@nestjs/common'
import { PlaidService } from './plaid.service'

@Controller('plaid')
export class PlaidController {
  constructor(private readonly plaidService: PlaidService) {}

  @Get('/link-token')
  async getLinkToken() {
    return {
      data: await this.plaidService.linkTokenCreate()
    }
  }
}

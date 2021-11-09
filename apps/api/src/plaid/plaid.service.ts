import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  Configuration,
  PlaidEnvironments,
  PlaidApi,
  Products,
  CountryCode
} from 'plaid'

@Injectable()
export class PlaidService {
  constructor(private configService: ConfigService) {
    const config = new Configuration({
      basePath:
        PlaidEnvironments[configService.get('PLAID_ENV', 'development')],
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': configService.get('PLAID_CLIENT_ID'),
          'PLAID-SECRET': configService.get('PLAID_SECRET')
        }
      }
    })

    this.client = new PlaidApi(config)
  }

  private client: PlaidApi

  async linkTokenCreate() {
    const request = {
      user: {
        // This should correspond to a unique id for the current user.
        client_user_id: '123'
      },
      client_name: 'Plaid Test App',
      products: [Products.Auth],
      language: 'en',
      webhook: 'https://webhook.example.com',
      country_codes: [CountryCode.Us]
    }

    const response = await this.client.linkTokenCreate(request)
    return response.data
  }
}

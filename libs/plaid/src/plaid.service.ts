import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  Configuration,
  PlaidEnvironments,
  PlaidApi,
  Products,
  CountryCode,
  SandboxItemFireWebhookRequest,
  SandboxItemFireWebhookRequestWebhookCodeEnum as WebhookCode,
  TransactionsGetRequest
} from 'plaid'

@Injectable()
export class PlaidService {
  constructor(private configService: ConfigService) {
    const config = new Configuration({
      basePath: PlaidEnvironments['sandbox'],
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

  async linkTokenCreate(userId: string) {
    const request = {
      user: {
        // This should correspond to a unique id for the current user.
        client_user_id: userId
      },
      client_name: 'Plaid Test App',
      products: [Products.Auth, Products.Transactions],
      language: 'en',
      webhook: 'https://0152-96-18-155-229.ngrok.io/items/hooks',
      country_codes: [CountryCode.Us]
    }

    try {
      const response = await this.client.linkTokenCreate(request)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async exchangePublicToken(token: string) {
    const request = {
      public_token: token
    }

    try {
      const response = await this.client.itemPublicTokenExchange(request)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async fireWebhook(token: string) {
    const req: SandboxItemFireWebhookRequest = {
      access_token: token,
      webhook_code: WebhookCode.DefaultUpdate
    }

    try {
      const response = await this.client.sandboxItemFireWebhook(req)
      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async getTransactions(token: string) {
    const req: TransactionsGetRequest = {
      access_token: token,
      start_date: '2021-03-15',
      end_date: '2022-03-15'
    }
    const res = await this.client.transactionsGet(req)
    return res.data
  }
}

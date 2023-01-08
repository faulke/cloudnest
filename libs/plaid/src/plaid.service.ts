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
  AccountsGetRequest,
  TransactionsSyncRequest,
  Transaction,
  RemovedTransaction,
  ItemRemoveRequest
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
      products: [Products.Auth, Products.Transactions, Products.Assets],
      language: 'en',
      webhook: 'https://f504-96-18-155-229.ngrok.io/api/items/hooks',
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
    const req = {
      access_token: token,
      webhook_code: 'SYNC_UPDATES_AVAILABLE'
    }

    try {
      const response = await this.client.sandboxItemFireWebhook(req as any)
      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async getTransactions(token: string) {
    const req = {
      access_token: token,
      start_date: '2021-01-01',
      end_date: '2023-01-01'
    }
    const res = await this.client.transactionsGet(req)
    return res.data
  }

// for webhooks
    //
    // dates should switch based on webhook type:
    // INITIAL_UPDATE: today - 30 days
    // HISTORICAL_UPDATE: 30 days - way back??
    // DEFAULT_UPDATE: 30 days - 2 days?? (checked several times per day by plaid)
    //
    // will need to paginate. see example:
    // https://plaid.com/docs/api/products/transactions/#transactionsget

  async syncTransactions(token: string, cursor?: string) {
    // https://plaid.com/docs/api/products/transactions/#transactionssync
    const req: TransactionsSyncRequest = {
      access_token: token,
      cursor
    }
    const res = await this.client.transactionsSync(req)
    return res.data
  }

  async getAccountsForItem(token: string) {
    const req: AccountsGetRequest = {
      access_token: token
    }
    const res = await this.client.accountsGet(req)
    return res.data
  }

  async removeItem(token: string) {
    const req: ItemRemoveRequest = {
      access_token: token
    }
    const res = await this.client.itemRemove(req)
    return res.data
  }
}

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
  RemovedTransaction
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
      // webhook: 'https://0152-96-18-155-229.ngrok.io/items/hooks',
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

  async updateTransactions(token: string, startCursor?: string) {
    let cursor = startCursor

    // New transaction updates since "cursor"
    let added: Array<Transaction> = []
    let modified: Array<Transaction> = []
    // Removed transaction ids
    let removed: Array<RemovedTransaction> = []
    let hasMore = true
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const data = await this.syncTransactions(token, cursor)
      console.log(data)
      // Add this page of results
      added = added.concat(data.added)
      modified = modified.concat(data.modified)
      removed = removed.concat(data.removed)
      hasMore = data.has_more
      // Update cursor to the next cursor
      cursor = data.next_cursor
    }

    console.log(added.length)
    console.log(cursor)

    // added.concat(modified)
    // saveTransactions(added)
    // removeTransactions(removed)
    // save cursor for item
  }

  async getAccountsForItem(token: string) {
    const req: AccountsGetRequest = {
      access_token: token
    }
    const res = await this.client.accountsGet(req)
    return res.data
  }
}

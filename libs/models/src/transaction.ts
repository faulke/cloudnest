import { Account } from "./account"

export interface Transaction {
  id?: string
  plaidId: string
  accountId: string
  plaidAccountId: string
  category: string
  subcategory: string
  type: string
  name: string
  amount: number
  currencyCode: string
  date: string
  pending: boolean
  accountOwner: string
  account?: Account
}

import { Account } from '@lib/models'
import { AccountBase } from 'plaid'

export const mapAccounts = (accounts: AccountBase[], userId?: string, itemId?: string) => {
  return accounts.map((account) => {
    const {
      name,
      mask,
      official_name: officialName,
      account_id: accountId,
      type,
      subtype,
      balances
    } = account
    return {
      userId,
      plaidId: accountId,
      itemId,
      name,
      mask,
      officialName,
      type,
      subtype,
      availableBalance: balances.available,
      currentBalance: balances.current,
      currencyCode: balances.iso_currency_code
    } as Account
  })
}

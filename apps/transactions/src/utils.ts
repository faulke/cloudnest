import { Transaction } from '@lib/models'
import { Transaction as PlaidTransaction } from 'plaid'

// map transactions
export const mapTransactions = (txns: PlaidTransaction[]) => {
  return txns.map((txn) => {
    const {
      // do we need to store our internal account id?
      account_id: plaidAccountId,
      transaction_id: plaidId,
      category,
      account_owner: accountOwner,
      pending,
      iso_currency_code: currencyCode,
      date,
      name,
      payment_channel: type,
      amount
    } = txn
    return {
      plaidId,
      plaidAccountId,
      category: category.join(','),
      name,
      amount,
      currencyCode,
      date,
      pending,
      accountOwner,
      type
    } as Transaction
  })
}

import { EntitySchema } from 'typeorm'
import { DollarsTransformer, Transaction } from '@lib/models'

export const TransactionSchema = new EntitySchema<Transaction>({
  name: 'transaction',
  tableName: 'transactions',
  columns: {
    id: {
      type: 'uuid',
      generated: 'uuid'
    },
    plaidId: {
      type: String,
      primary: true
    },
    accountId: {
      type: String,
      nullable: true
    },
    plaidAccountId: {
      type: String
    },
    category: {
      type: String
    },
    type: {
      type: String,
      nullable: true
    },
    name: {
      type: String
    },
    currencyCode: {
      type: String
    },
    accountOwner: {
      type: String,
      nullable: true
    },
    pending: {
      type: Boolean
    },
    amount: {
      type: Number,
      transformer: new DollarsTransformer()
    },
    date: {
      type: String
    }
  }
})

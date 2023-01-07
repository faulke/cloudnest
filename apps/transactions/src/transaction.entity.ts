import { EntitySchema } from 'typeorm'
import { DollarsTransformer, Transaction } from '@lib/models'

export const TransactionSchema = new EntitySchema<Transaction>({
  name: 'transaction',
  tableName: 'transactions',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    plaidId: {
      type: String,
      nullable: false
    },
    accountId: {
      type: String,
      nullable: false
    },
    plaidAccountId: {
      type: String,
      nullable: false
    },
    category: {
      type: String,
      nullable: false
    },
    subcategory: {
      type: String,
      nullable: false
    },
    type: {
      type: String,
      nullable: false
    },
    name: {
      type: String,
      nullable: false
    },
    currencyCode: {
      type: String,
      nullable: false
    },
    accountOwner: {
      type: String,
      nullable: false
    },
    pending: {
      type: Boolean,
      default: false
    },
    amount: {
      type: Number,
      nullable: false,
      transformer: new DollarsTransformer()
    },
    date: {
      type: String,
      nullable: false
    }
  }
})

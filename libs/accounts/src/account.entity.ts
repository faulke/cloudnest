import { EntitySchema } from 'typeorm'
import { Account, DollarsTransformer } from '@lib/models'

export const AccountSchema = new EntitySchema<Account>({
  name: 'account',
  tableName: 'accounts',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    plaidId: {
      type: String,
      nullable: false,
      unique: true
    },
    name: {
      type: String,
      nullable: false
    },
    mask: {
      type: String,
      nullable: false
    },
    officialName: {
      type: String
    },
    type: {
      type: String
    },
    subtype: {
      type: String
    },
    availableBalance: {
      type: Number,
      transformer: new DollarsTransformer()
    },
    currentBalance: {
      type: Number,
      transformer: new DollarsTransformer()
    },
    currencyCode: {
      type: String
    },
    userId: {
      type: 'uuid',
      nullable: false
    }
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'user',
      nullable: false
    }
  }
})

import { EntitySchema } from 'typeorm'
import { Item } from '@lib/models'

export const ItemSchema = new EntitySchema<Item>({
  name: 'item',
  tableName: 'items',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    itemId: {
      type: String,
      nullable: false,
      unique: true,
    },
    token: {
      type: String,
      nullable: false
    },
    institutionId: {
      type: String,
      nullable: false
    },
    lastCursor: {
      type: String,
      nullable: true
    },
    userId: {
      type: 'uuid'
    }
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'user',
      nullable: false
    },
    accounts: {
      type: 'one-to-many',
      target: 'account',
      onDelete: 'CASCADE',
      eager: true
    }
  }
})

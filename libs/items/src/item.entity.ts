import { EntitySchema } from 'typeorm'
import { Item } from './item.model'

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
      name: 'item_id'
    },
    token: {
      type: String,
      nullable: false
    },
    initReady: {
      type: Boolean,
      name: 'init_ready',
      default: false
    },
    historicalReady: {
      type: Boolean,
      name: 'historical_ready',
      default: false
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

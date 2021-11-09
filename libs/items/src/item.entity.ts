import { EntitySchema } from 'typeorm'
import { Item } from './item.model'

export const ItemSchema = new EntitySchema<Item>({
  name: 'item',
  tableName: 'items',
  columns: {
    id: {
      type: String,
      primary: true,
      nullable: false
    },
    token: {
      type: String,
      nullable: false
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

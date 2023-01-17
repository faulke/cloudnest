import { EntitySchema } from 'typeorm'
import { Door } from '@lib/models'

export const DoorSchema = new EntitySchema<Door>({
  name: 'door',
  tableName: 'doors',
  columns: {
    id: {
      type: 'uuid',
      generated: 'uuid',
      primary: true
    },
    name: {
      type: String,
      nullable: true
    },
    number: {
      type: Number,
      nullable: true
    },
    addressLine1: {
      type: String
    },
    addressLine2: {
      type: String,
      nullable: true
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zipcode: {
      type: Number
    },
    rental: {
      type: Boolean,
      default: false
    },
    organizationId: {
      type: String
    }
  },
  relations: {
    organization: {
      type: 'many-to-one',
      target: 'organization'
    },
    createdBy: {
      type: 'many-to-one',
      target: 'organization_user'
    }
  }
})

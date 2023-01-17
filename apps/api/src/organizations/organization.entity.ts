import { EntitySchema } from 'typeorm'
import { Organization } from '@lib/models'

export const OrganizationSchema = new EntitySchema<Organization>({
  name: 'organization',
  tableName: 'organizations',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    name: {
      type: String
    },
    createdById: {
      type: String,
      select: false
    }
  },
  relations: {
    users: {
      type: 'one-to-many',
      target: 'organization_user',
      onDelete: 'CASCADE'
    },
    doors: {
      type: 'one-to-many',
      target: 'door',
      onDelete: 'CASCADE'
    },
    createdBy: {
      type: 'many-to-one',
      target: 'user',
      eager: true
    }
  }
})

export default OrganizationSchema

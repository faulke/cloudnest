import { EntitySchema } from 'typeorm'
import { Organization } from '@lib/models'

const OrganizationSchema = new EntitySchema<Organization>({
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
    }
  }
})

export default OrganizationSchema

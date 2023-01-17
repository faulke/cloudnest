import { EntitySchema } from 'typeorm'
import { Organization, OrganizationUser, Role } from '@lib/models'

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
      onDelete: 'CASCADE',
      eager: true,
      inverseSide: 'organization'
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

export const OrganizationUserSchema = new EntitySchema<OrganizationUser>({
  name: 'organization_user',
  tableName: 'organization_users',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    role: {
      type: 'enum',
      enum: Role,
      default: Role.Admin
    },
    isActive: {
      name: 'is_active',
      type: Boolean,
      default: true
    },
    userId: {
      type: String
    },
    organizationId: {
      type: String
    }
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'user'
    },
    organization: {
      type: 'many-to-one',
      target: 'organization',
      joinColumn: true
    }
  }
})

export default OrganizationSchema

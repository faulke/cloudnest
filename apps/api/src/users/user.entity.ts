import { EntitySchema } from 'typeorm'
import { User, OrganizationUser, Role } from '@lib/models'

export const UserSchema = new EntitySchema<User>({
  name: 'user',
  tableName: 'users',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    externalId: {
      type: String,
      nullable: true,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    isActive: {
      type: Boolean,
      name: 'is_active',
      default: true
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
    roles: {
      type: 'enum',
      enum: Role,
      array: true,
      default: [Role.Admin]
    },
    isActive: {
      name: 'is_active',
      type: Boolean,
      default: true
    }
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'user'
    },
    organization: {
      type: 'many-to-one',
      target: 'organization'
    }
  }
})

export default UserSchema

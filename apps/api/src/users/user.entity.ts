import { EntitySchema } from 'typeorm'
import { User } from '@lib/interfaces'

const UserSchema = new EntitySchema<User>({
  name: 'user',
  tableName: 'users',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
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

export default UserSchema

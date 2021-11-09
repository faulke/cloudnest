import { EntitySchema } from 'typeorm'
import { User } from '@lib/interfaces'

const UserSchema = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  target: User,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: true
    },
    email: {
      type: String,
      unique: true
    }
  }
})

export default UserSchema

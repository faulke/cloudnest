import { Door } from './door'
import { User } from './user'

export interface Organization {
  id: string
  name: string
  users?: User[]
  doors?: Door[]
  createdBy?: User
  createdById?: string
}

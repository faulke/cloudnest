import { Account } from './account'
import { User } from './user'

export interface Item {
  id?: string
  plaidId: string
  token: string
  userId: string
  user?: User
  institutionId: string
  lastCursor?: string
  accounts?: Account[]
}

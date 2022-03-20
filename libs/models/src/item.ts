import { User } from './user'

export interface Item {
  id?: string
  itemId: string
  token: string
  userId: string
  initReady?: boolean
  historicalReady?: boolean
  user?: User
}

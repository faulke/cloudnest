import { User } from '@lib/interfaces'

export class Item {
  id?: string
  itemId: string
  token: string
  userId: string
  initReady?: boolean
  historicalReady?: boolean
  user?: User
}

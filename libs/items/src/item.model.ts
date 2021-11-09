import { User } from '@lib/interfaces'

export class Item {
  id: string
  token: string
  userId: string
  user?: User
}

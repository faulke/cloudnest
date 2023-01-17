import { Organization } from './organization'

export interface User {
  id: string
  externalId?: string
  email?: string
  isActive?: boolean
  organizations?: Organization[]
}


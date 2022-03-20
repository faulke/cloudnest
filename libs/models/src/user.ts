import { Organization } from './organization'

export enum Role {
  Admin = 'admin',
  Viewer = 'viewer'
}

export interface User {
  id: string
  externalId?: string
  email?: string
  isActive?: boolean
  organizations?: Organization[]
}

export interface OrganizationUser {
  id: string
  organization: Organization
  user: User
  roles: Role[]
  isActive: boolean
}

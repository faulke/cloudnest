import { Door } from './door'
import { User } from './user'

export interface Organization {
  id: string
  name: string
  users?: OrganizationUser[]
  doors?: Door[]
  createdBy?: User
  createdById?: string
}

export enum Role {
  Admin = 'admin',
  Viewer = 'viewer'
}

export interface OrganizationUser {
  id: string
  organization?: Organization
  organizationId?: string
  user?: User
  userId: string
  roles: Role[]
  isActive: boolean
}

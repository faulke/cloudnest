import { Organization } from './organization'
import { OrganizationUser } from './user'

export interface Door {
  id?: string
  name: string
  number?: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zipcode: number
  rental: boolean
  // unit: Unit  // ref
  organizationId?: string
  organization?: Organization
  createdBy?: OrganizationUser
}

// doors
// project associated w/ door
// door associated with organization
// doors can have one or many projects

// units
// a collection of many doors

// accounts
// associated with a user
// choose to opt-in account to organization, so others can use it in projects
// account is associated with a project (many-to-one)

// projects
// associated with a door, or general (like tools)
// add accounts to projects (from user and/or organization)
// can they be associated with many doors?

// organizations
// one to many users
// roles?
// 

// transactions
// associate a transaction with a project
// tags - can be used like projects
// tags - associated with an organization?
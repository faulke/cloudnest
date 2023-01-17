import { Organization, OrganizationUser, Role } from '@lib/models'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import OrganizationSchema, { OrganizationUserSchema } from './organization.entity'

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(OrganizationSchema)
    private orgsRepo: Repository<Organization>,
    @InjectRepository(OrganizationUserSchema)
    private orgUsersRepo: Repository<OrganizationUser>
  ) {}

  findAll(userId: string): Promise<Organization[]> {
    return this.orgsRepo.find({ where: { createdById: userId } })
  }

  async create(org: Organization): Promise<Organization> {
    const newOrg = await this.orgsRepo.save(org)
    const user = await this.orgUsersRepo.save({
      userId: newOrg.createdById,
      role: Role.Admin,
      isActive: true,
      organizationId: newOrg.id
    })
    return {
      ...newOrg,
      users: [
        user
      ]
    }
  }
}

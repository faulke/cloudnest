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

  // need to test with another user, organization, and org users
  findAllByUser(userId: string): Promise<Organization[]> {
    return this.orgsRepo
      .createQueryBuilder('organizations')
      .leftJoinAndSelect('organizations.users', 'organization_user')
      .where('organizations.created_by_id = :userId', { userId })
      .orWhere('organization_user.user_id = :userId', { userId })
      .getMany()
  }

  findOneByUser(userId: string, orgId: string): Promise<Organization> {
    return this.orgsRepo
      .createQueryBuilder('organizations')
      .leftJoinAndSelect('organizations.users', 'organization_user')
      .where('organizations.created_by_id = :userId', { userId })
      .orWhere('organization_user.user_id = :userId', { userId })
      .andWhere('organizations.id = :orgId', { orgId })
      .getOne()
  }

  getOrgUsers(orgId: string): Promise<OrganizationUser[]> {
    return this.orgUsersRepo.find({ where: { organizationId: orgId } })
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

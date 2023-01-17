import { Organization } from '@lib/models'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import OrganizationSchema from './organization.entity'

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(OrganizationSchema)
    private orgsRepo: Repository<Organization>
  ) {}

  findAll(userId: string): Promise<Organization[]> {
    return this.orgsRepo.find({ where: { createdById: userId } })
  }

  create(org: Organization): Promise<Organization> {
    return this.orgsRepo.save(org)
  }
}

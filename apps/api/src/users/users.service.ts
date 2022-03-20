import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import UserSchema, { OrganizationUserSchema } from './user.entity'
import { OrganizationUser, User } from '@lib/models'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepo: Repository<User>,
    @InjectRepository(OrganizationUserSchema)
    private orgUsersRepo: Repository<OrganizationUser>
  ) {}

  async create({ email, externalId }): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { externalId } })
    if (user) {
      return user
    }
    return this.usersRepo.save({ email, externalId })
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.usersRepo.findOne({ where: { email } })
  }

  async getOrgUserByEmail(email: string): Promise<OrganizationUser> {
    const { id: userId } = await this.getOrgUserByEmail(email)
    const orgUser = await this.orgUsersRepo.findOne({ where: { userId } })
    return orgUser
  }
}

import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { Repository } from 'typeorm'
import { Cache } from 'cache-manager'
import * as jwt from 'jsonwebtoken'
import * as jwksClient from 'jwks-rsa'
import UserSchema, { OrganizationUserSchema } from './user.entity'
import { OrganizationUser, User } from '@lib/models'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepo: Repository<User>,
    @InjectRepository(OrganizationUserSchema)
    private orgUsersRepo: Repository<OrganizationUser>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  async create({ email, externalId }): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { externalId } })
    if (user) {
      return user
    }
    return this.usersRepo.save({ email, externalId })
  }

  getUserByEmail(email: string): Promise<User> {
    return this.usersRepo.findOne({ where: { email } })
  }

  async getOrgUserByEmail(email: string): Promise<OrganizationUser> {
    const { id: userId } = await this.getOrgUserByEmail(email)
    const orgUser = await this.orgUsersRepo.findOneBy({ userId })
    return orgUser
  }

  getUserByExternalId(externalId: string): Promise<User> {
    return this.usersRepo.findOne({ where: { externalId } })
  }

  async getUserIdFromToken(token: string): Promise<{ userId: string | null, error: string | null }> {
    const res = { userId: null, error: null }
    const decoded = jwt.decode(token, { complete: true })

    let jwk = await this.cacheManager.get('jwk')
    if (!jwk) {
      const domain = this.configService.get('AUTH0_DOMAIN')
      const client = jwksClient({
        jwksUri: `https://${domain}/.well-known/jwks.json`
      })
      const key = await client.getSigningKey(decoded.header.kid)

      jwk = key.getPublicKey()
      this.cacheManager.set('jwk', jwk)
    }

    try {
      const verified = jwt.verify(token, jwk as any)
      const externalUserId = verified[this.configService.get('AUTH0_USERID_CLAIM')]
      let userId = await this.cacheManager.get(externalUserId)
    
      if (!userId) {
        const user = await this.getUserByExternalId(externalUserId)
        if (!user) {
          res.error = 'User not found'
          return res
        }
  
        userId = user.id
        this.cacheManager.set(externalUserId, userId)
      }
  
      res.userId = userId
      return res
    } catch (error) {
      res.error = 'Failed to verify token'
      return res
    }
  }
}

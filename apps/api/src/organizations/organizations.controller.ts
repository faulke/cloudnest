import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { NestRequest } from '../middleware/auth'
import { OrganizationsService } from './organizations.service'

@Controller('organizations')
export class OrganizationsController {
  constructor(
    private readonly orgsService: OrganizationsService
  ) {}

  @Get()
  async getOrgsForUser(@Req() request: NestRequest) {
    return {
      data: await this.orgsService.findAllByUser(request.userId)
    }
  }

  @Get(':id')
  async getById(@Req() request: NestRequest, @Param('id') id: string) {
    return {
      data: await this.orgsService.findOneByUser(request.userId, id)
    }
  }

  @Get(':id/users')
  async getOrgUsers(@Req() request: NestRequest, @Param('id') id: string) {
    // first determine if user is part of org
    // this could be put in a cache and queried by middleware
    // check db for now
    const org = await this.orgsService.findOneByUser(request.userId, id)

    if (!org?.id) {
      return {
        data: 'Not Found' // use @Res() object to set status code
      }
    }
    return {
      data: await this.orgsService.getOrgUsers(id)
    }
  }

  @Post()
  async createOrg(@Req() request: NestRequest, @Body() org: any) {
    return {
      data: await this.orgsService.create({
        ...org,
        createdById: request.userId
      })
    }

    // add organization user w/ role Admin
  }
}

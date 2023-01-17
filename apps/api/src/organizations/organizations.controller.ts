import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { NestRequest } from '../middleware/auth'
import { OrganizationsService } from './organizations.service'

@Controller('organizations')
export class OrganizationsController {
  constructor(
    private readonly orgsService: OrganizationsService
  ) {}

  @Get()
  async getOrgs(@Req() request: NestRequest) {
    return {
      data: await this.orgsService.findAll(request.userId)
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

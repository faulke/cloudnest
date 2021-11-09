import { Controller, Get } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return {
      data: await this.usersService.findAll()
    }
  }

  @Get('/create')
  async createUser() {
    return {
      data: await this.usersService.create()
    }
  }
}

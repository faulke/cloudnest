import { Controller, Body, Post } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  async createUser(@Body() { email, externalId }) {
    return await this.usersService.create({ email, externalId })
  }
}

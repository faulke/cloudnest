import { User } from '@lib/models'
import { Controller, Body, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  // call users api to create user
  async registerUser(@Body() { email, externalId }): Promise<User> {
    return this.authService.createUser({ email, externalId })
  }

  // @Post('/register/:invite')
  // for invited users to organizations, if not existing user?
}

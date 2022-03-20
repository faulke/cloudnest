import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import User, { OrganizationUserSchema } from './user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, OrganizationUserSchema])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}

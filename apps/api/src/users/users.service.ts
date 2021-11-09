import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import UserSchema from './user.entity'
import { User } from '@lib/interfaces'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async create(): Promise<User> {
    return this.usersRepository.save({ email: 'test2@email.com' })
  }
}

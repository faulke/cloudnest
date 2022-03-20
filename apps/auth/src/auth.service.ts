import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import { User } from '@lib/models'

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}
  async createUser({ email, externalId }): Promise<User> {
    // add this to /libs
    const host = this.configService.get('API_HOST')
    const port = this.configService.get('API_PORT')
    const res = await axios.post(`http://${host}:${port}/users/create`, {
      email,
      externalId
    })
    console.log(res.data)
    return res.data
  }
}

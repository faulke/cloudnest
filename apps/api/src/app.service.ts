import { Injectable } from '@nestjs/common'
import { User } from '@lib/interfaces'

@Injectable()
export class AppService {
  getHello(): User {
    return { id: '12346', email: 'test@email.com', isActive: true }
  }
}

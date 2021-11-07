import { Injectable } from '@nestjs/common'
import { Test } from '@lib/interfaces'

@Injectable()
export class AppService {
  getHello(): Test {
    return { field: 'Hello world!' }
  }
}

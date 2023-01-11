import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { UsersService } from '../users/users.service'

const getTokenFromRequest = (req: Request): { token: string | null, error: string | null } => {
  const res = { token: null, error: null }
  const header = req.headers.authorization

  if (!header) {
    res.error = 'Missing Authorization header'
    return res
  }

  if (!header.includes('Bearer ')) {
    res.error = 'Bad Authorization header format'
    return res
  }

  const token = header.split('Bearer ')[1]
  if (!token) {
    res.error = 'Missing token in Authorization header'
    return res
  }

  res.token = token
  return res
}

export interface NestRequest extends Request {
  userId?: string
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly usersService: UsersService
  ) {}
  async use(req: NestRequest, res: Response, next: NextFunction) {
    const { token, error: tokenError } = getTokenFromRequest(req)
    if (tokenError) {
      return res.status(400).send(tokenError)
    }

    const { userId, error } = await this.usersService.getUserIdFromToken(token)
    if (error) {
      return res.status(401).send(error)
    }
    
    req.userId = userId

    next()
  }
}

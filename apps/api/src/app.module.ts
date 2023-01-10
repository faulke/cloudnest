import { Module, NestModule, MiddlewareConsumer, CacheModule, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { PlaidModule } from '@lib/plaid'
import { ItemsModule } from './items/items.module'
import { OrganizationsModule } from './organizations/organizations.module'
import { AccountsModule } from './accounts/accounts.module'

// entities
import {
  UserSchema as User,
  OrganizationUserSchema as OrganizationUser
} from './users/user.entity'
import { ItemSchema as Item } from './items/item.entity'
import { AccountSchema as Account } from './accounts/account.entity'
import Organization from './organizations/organization.entity'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { AuthMiddleware } from './middleware/auth'

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, OrganizationUser, Item, Organization, Account],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy()
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({ isGlobal: true }),
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    PlaidModule,
    ItemsModule,
    OrganizationsModule,
    AccountsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/items', method: RequestMethod.GET },
        '/items/hooks/test',
        '/items/*-token',
        { path: '/items', method: RequestMethod.DELETE },
        '/accounts',
        '/users'
      )
  }
}

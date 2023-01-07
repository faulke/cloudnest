import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { PlaidModule } from './plaid/plaid.module'
import { ItemsModule } from './items/items.module'
import { OrganizationsModule } from './organizations/organizations.module'
import { AccountsModule } from './accounts/accounts.module'

// entities
import {
  UserSchema as User,
  OrganizationUserSchema as OrganizationUser
} from './users/user.entity'
import { ItemSchema as Item } from '@lib/items'
import { AccountSchema as Account } from '@lib/accounts'
import Organization from './organizations/organization.entity'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

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
export class AppModule {}

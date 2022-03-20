import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { PlaidModule } from './plaid/plaid.module'
import { ItemsModule } from './items/items.module'
import { OrganizationsModule } from './organizations/organizations.module'

// entities
import {
  UserSchema as User,
  OrganizationUserSchema as OrganizationUser
} from './users/user.entity'
import { ItemSchema as Item } from '@lib/items'
import Organization from './organizations/organization.entity'

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, OrganizationUser, Item, Organization],
  synchronize: true
  // namingStrategy: new SnakeNamingStrategy()
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    PlaidModule,
    ItemsModule,
    OrganizationsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

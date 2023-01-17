import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import OrganizationSchema from './organization.entity'
import { OrganizationsController } from './organizations.controller'
import { OrganizationsService } from './organizations.service'

@Module({
  imports:[
    TypeOrmModule.forFeature([OrganizationSchema])
  ],
  controllers: [OrganizationsController],
  providers: [OrganizationsService]
})
export class OrganizationsModule {}

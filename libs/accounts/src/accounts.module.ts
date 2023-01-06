import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountsService } from './accounts.service'
import { AccountSchema } from './account.entity'

@Module({
  imports: [TypeOrmModule.forFeature([AccountSchema])],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}

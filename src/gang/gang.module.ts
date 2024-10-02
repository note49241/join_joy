import { Module } from '@nestjs/common'
import { GangController } from './gang.controller'
import { GangService } from './gang.service'
import { Gang } from '../schema/gang.schema'
import { HisGang } from '../schema/his_gang.schema'
import { User } from '../schema/user.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Gang', schema: Gang },
      { name: 'HisGang', schema: HisGang },
      { name: 'User', schema: User }
    ])
  ],
  controllers: [GangController],
  providers: [GangService]
})
export class GangModule {}

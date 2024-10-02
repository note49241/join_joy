import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TodoModule } from './todo/todo.module'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { GangModule } from './gang/gang.module'
import { Gang } from './schema/gang.schema'
import { HisGang } from './schema/his_gang.schema'
import { User } from './schema/user.schema'
import { ProfileModule } from './profile/profile.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB),
    MongooseModule.forFeature([
      { name: 'Gang', schema: Gang },
      { name: 'HisGang', schema: HisGang },
      { name: 'User', schema: User }
    ]),
    GangModule,
    ProfileModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

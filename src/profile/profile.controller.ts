import { Body, Controller, Get, Post } from '@nestjs/common'
import { ProfileService } from './profile.service'
import { CreateDto, UpdateDto, RepassDto } from '../dto/user.dto'

@Controller('user')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // @Get()
  // getHello(): string {
  //   return this.todoService.getHello();
  // }

  @Get('/list')
  getHello() {
    //return this.todoService.getList();
    return []
  }

  @Post('/create')
  async createUser(@Body() body: CreateDto) {
    return this.profileService.create(body)
  }
  @Post('/update')
  async updateUser(@Body() body: UpdateDto) {
    return this.profileService.update(body)
  }
  @Post('/reset_password')
  async resetPass(@Body() body: RepassDto) {
    return this.profileService.rePass(body)
  }
}

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ProfileService } from './profile.service'
import { CreateDto, UpdateDto, RepassDto } from '../dto/user.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('user')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // @Get()
  // getHello(): string {
  //   return this.todoService.getHello();
  // }

  @UseGuards(JwtAuthGuard)
  @Get('/list')
  getHello() {
    //return this.todoService.getList();
    return []
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createUser(@Body() body: CreateDto) {
    return this.profileService.create(body)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update')
  async updateUser(@Body() body: UpdateDto) {
    return this.profileService.update(body)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/reset_password')
  async resetPass(@Body() body: RepassDto) {
    return this.profileService.rePass(body)
  }
}

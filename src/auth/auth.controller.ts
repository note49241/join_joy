import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from '../dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly todoService: AuthService) {}

  @Post('/login')
  async login(@Body() body: LoginDto) {
    return this.todoService.login(body)
  }

  @Post('/logout')
  async logout(@Body() body) {
    return this.todoService.logout(body)
  }

  @Post('/session')
  async validateLogin(@Body() body) {
    return this.todoService.validateLogin(body.token)
  }
}

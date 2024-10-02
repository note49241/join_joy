import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly User: Model<any>,
    private jwtService: JwtService
  ) {}

  login = async (body) => {
    const { username, password } = body

    try {
      const check_user = await this.User.findOne({ user_name: username })
      if (!check_user) {
        return { code: 304, message: 'invalid user' }
      }

      const comparePass = await bcrypt.compare(password, check_user.password)

      if (!comparePass) {
        return { code: 304, message: 'invalid password' }
      }

      await this.User.findByIdAndUpdate(check_user._id, { $set: { last_login: new Date() } }, { new: true })

      const token = await this.jwtService.signAsync({ user_id: check_user._id, user_name: check_user.name })

      return { code: 200, message: 'done', data: { token: token } }
    } catch (error) {
      return error
    }
  }

  logout = async (body) => {
    return body
  }
}

import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import * as dayjs from 'dayjs'

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
        return { code: 400, message: 'invalid user' }
      }

      const comparePass = await bcrypt.compare(password, check_user.password)

      if (!comparePass) {
        return { code: 400, message: 'invalid password' }
      }

      const last = await this.User.findByIdAndUpdate(check_user._id, { $set: { last_login: new Date() } }, { new: true })
      //console.log(last)
      const token = await this.jwtService.signAsync({ user_id: check_user._id, user_name: check_user.name, last_login: last.last_login })

      return { code: 200, message: 'done', data: { token: token } }
    } catch (error) {
      return error
    }
  }

  logout = async (body) => {
    return body
  }

  validateLogin = async (token) => {
    try {
      let newToken = token
      const decodejwt = await this.jwtService.decode(token)

      const checkTime = dayjs().diff(dayjs(decodejwt.last_login), 'minute')
      if (checkTime >= 90) {
        return { code: 401, data: { token: newToken, session_login: false } }
      } else if (checkTime >= 20 && checkTime <= 90) {
        const last = await this.User.findByIdAndUpdate(decodejwt.user_id, { $set: { last_login: new Date() } }, { new: true })
        newToken = await this.jwtService.signAsync({ user_id: decodejwt.user_id, user_name: decodejwt.name, last_login: last.last_login })
      }
      return { code: 200, data: { token: newToken, session_login: true } }
    } catch (error) {
      return { code: 401, data: { token: null, session_login: false } }
    }
  }
}

import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET // ควรเก็บ secret ใน environment variable
    })
  }

  async validate(payload: any) {
    // นี่คือข้อมูล payload ที่ถูก decode มาจาก token
    return { userId: payload.sub, username: payload.username }
  }
}

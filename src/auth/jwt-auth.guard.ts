import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super()
  }

  canActivate(context: ExecutionContext) {
    // ตรวจสอบ JWT ใน header
    const request = context.switchToHttp().getRequest<Request>()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException('Token not found')
    }
    console.log(this.jwtService.verify(token))
    try {
      // ตรวจสอบว่า token ถูกต้องหรือไม่
      const payload = this.jwtService.verify(token)
      request['user'] = payload // นำข้อมูลผู้ใช้ไปเก็บไว้ใน request
    } catch (error) {
      return false
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers['authorization']
    if (!authHeader) {
      return null
    }
    const [bearer, token] = authHeader.split(' ')
    return bearer === 'Bearer' ? token : null
  }
}

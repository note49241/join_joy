import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        // ตรวจสอบว่าคำตอบมี code, message, data หรือไม่
        const { code = 200, message = 'Success', data = null } = response

        return {
          code, // ใช้ค่าที่ส่งมา หรือค่าเริ่มต้น
          message,
          data
        }
      })
    )
  }
}

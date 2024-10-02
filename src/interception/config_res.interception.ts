import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        // ตรวจสอบว่าคำตอบมี code, message, data หรือไม่
        const { code, data = null } = response

        let message = ''
        switch (code) {
          case 200:
            message = 'Success'
            break
          case 201:
            message = 'Create Success '
            break
          case 202:
            message = 'Accepted'
            break
          case 400:
            message = 'Bad Request'
            break
          case 401:
            message = 'UnAuthenticated'
            break
          case 404:
            message = 'Not Found'
            break
          default:
            message = response.message
            break
        }
        return {
          code,
          message,
          data
        }
      })
    )
  }
}

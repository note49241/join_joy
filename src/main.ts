import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { urlencoded, json } from 'express'
import { TransformInterceptor } from './interception/config_res.interception'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.use(json({ limit: process.env.JSONLIMIT }))
  app.use(urlencoded({ extended: true, limit: '500mb' }))
  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(process.env.PORT)
}
bootstrap()

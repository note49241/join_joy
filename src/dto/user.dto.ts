import { IsString, IsEmpty } from 'class-validator'

export class CreateDto {
  @IsString()
  @IsEmpty()
  username: string

  @IsString()
  name: string

  @IsString()
  mail: string

  @IsString()
  password: string
}

export class UpdateDto {
  @IsString()
  name: string

  @IsString()
  mail: string

  @IsString()
  password: string
}

export class RepassDto {
  @IsString()
  mail: string

  @IsString()
  password: string
}

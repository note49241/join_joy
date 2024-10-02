import { IsString, IsEmpty } from 'class-validator'

export class LoginDto {
  @IsString()
  @IsEmpty()
  username: string

  @IsString()
  @IsEmpty()
  password: string
}

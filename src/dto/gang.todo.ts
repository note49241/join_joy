import { IsString, IsEmpty, IsNumber } from 'class-validator'

export class CreateGangDto {
  @IsString()
  @IsEmpty()
  gang_name: string

  @IsString()
  gang_detail: string

  @IsString()
  gang_address: string

  @IsString()
  host: string
}

export class updateGangDto {
  @IsString()
  @IsEmpty()
  gang_name: string

  @IsString()
  gang_detail: string

  @IsString()
  gang_address: string

  @IsString()
  host: string
}

export class OpenGangDto {
  @IsString()
  @IsEmpty()
  gang_id: string

  @IsString()
  @IsEmpty()
  gang_name: string

  @IsString()
  @IsEmpty()
  username: string

  @IsString()
  @IsEmpty()
  date: string

  @IsString()
  @IsEmpty()
  start: string

  @IsString()
  end: string

  @IsNumber()
  maximum_palyer: number
}

export class joinGangDto {
  @IsString()
  @IsEmpty()
  _id: string

  @IsString()
  party_id: string

  @IsString()
  gane_event_date: string

  @IsString()
  user_id: string
}

export class unJoinGangDto {
  @IsString()
  @IsEmpty()
  party_id: string

  @IsString()
  gane_event_date: string

  @IsString()
  user_id: string
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { GangService } from './gang.service'
import { CreateGangDto, updateGangDto, OpenGangDto, joinGangDto, unJoinGangDto } from '../dto/gang.todo'

@Controller('gang')
export class GangController {
  constructor(private readonly gangService: GangService) {}

  // @Get()
  // getHello(): string {
  //   return this.gangService.getHello();
  // }

  @Post('/list')
  getList(@Body() body) {
    return this.gangService.getList(body)
  }

  @Get('/:gang_id')
  getGang(@Param() param) {
    console.log(param.gangName)
    return this.gangService.getDetail(param)
  }

  @Post('/create')
  async createGang(@Body() body: CreateGangDto) {
    return this.gangService.createGang(body)
  }

  @Post('/update')
  async updateGang(@Body() body: updateGangDto) {
    return this.gangService.updateGang(body)
  }

  @Post('/join')
  async joinGang(@Body() body: joinGangDto) {
    return this.gangService.joinGang(body)
  }

  @Post('/unjoin')
  async unJoinGang(@Body() body: unJoinGangDto) {
    return this.gangService.unJoin(body)
  }

  @Post('/openParty')
  async openPartyGang(@Body() body: OpenGangDto) {
    return this.gangService.openPartyGang(body)
  }

  @Post('/get_his_join')
  async getHisJoinGang(@Body() body: OpenGangDto) {
    return this.gangService.getHisJoinGang(body)
  }
}

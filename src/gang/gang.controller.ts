import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { GangService } from './gang.service'
import { CreateGangDto, updateGangDto, OpenGangDto, joinGangDto, unJoinGangDto } from '../dto/gang.todo'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
@Controller('gang')
export class GangController {
  constructor(private readonly gangService: GangService) {}

  // @Get()
  // getHello(): string {
  //   return this.gangService.getHello();
  // }
  // @UseGuards(JwtAuthGuard)
  @Post('/list')
  getList(@Body() body) {
    return this.gangService.getList(body)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:gang_id')
  getGang(@Param() param) {
    console.log(param.gangName)
    return this.gangService.getDetail(param)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createGang(@Body() body: CreateGangDto) {
    return this.gangService.createGang(body)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update')
  async updateGang(@Body() body: updateGangDto) {
    return this.gangService.updateGang(body)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/join')
  async joinGang(@Body() body: joinGangDto) {
    return this.gangService.joinGang(body)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/unjoin')
  async unJoinGang(@Body() body: unJoinGangDto) {
    return this.gangService.unJoin(body)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/openParty')
  async openPartyGang(@Body() body: OpenGangDto) {
    return this.gangService.openPartyGang(body)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/get_his_join')
  async getHisJoinGang(@Body() body: OpenGangDto) {
    return this.gangService.getHisJoinGang(body)
  }
}

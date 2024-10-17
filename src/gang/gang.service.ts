import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class GangService {
  constructor(
    @InjectModel('Gang') private readonly Gang: Model<any>,
    @InjectModel('HisGang') private readonly HisGang: Model<any>,
    @InjectModel('User') private readonly User: Model<any>
  ) {}

  getList = async (body) => {
    const { sport_type, page = 0, pageLimit = 10 } = body
    let condition = {}

    if (sport_type) {
      condition = { sport_type: sport_type, status: true }
    } else {
      condition = { status: true }
    }

    const gang_data = await this.Gang.find(condition)
      .skip(page * pageLimit)
      .limit(pageLimit)

    return { code: 200, data: gang_data }
  }

  getDetail = async (param) => {
    const { gang_id } = param

    const gang_data = await this.Gang.findOne({ _id: gang_id, status: true })

    return { code: 200, data: gang_data }
  }

  joinGang = async (body) => {
    const { _id, party_id, gane_event_date, user_id } = body

    const gang_data = await this.Gang.findOne({ _id: _id, status: true }).sort({ _id: -1 })

    if (!gang_data) {
      return { code: 404, message: 'not found' }
    }

    const gang_party_data = await this.HisGang.findOne({
      _id: party_id,
      gane_event_date: gane_event_date
    })

    if (!gang_party_data) {
      return { code: 404, message: 'contact Gang owner to open party' }
    }

    const profile_user = await this.User.findOne({ _id: user_id })

    const checkDupPlayer = await this.HisGang.findOne({ _id: party_id, 'gang_player.user_id': profile_user._id })

    if (checkDupPlayer) {
      return { code: 304, message: 'dup player' }
    }
    const update_gang_party_data = await this.HisGang.findByIdAndUpdate(
      party_id,
      { $set: { gang_player: [...gang_party_data.gang_player, { user_id: profile_user._id, player_name: profile_user.name }] } }, // Update the gang_player array
      { new: true } // Return the updated document
    )

    return { code: 200, data: update_gang_party_data }
  }

  unJoin = async (body) => {
    const { party_id, gane_event_date, user_id } = body

    const gang_party_data = await this.HisGang.findOne({
      _id: party_id,
      gane_event_date: gane_event_date
    })

    if (!gang_party_data) {
      return { code: 404, message: 'contact Gang owner to check party' }
    }

    const un_join = gang_party_data.gang_player.filter((player) => player.id !== user_id)

    const updatedGang = await this.HisGang.findByIdAndUpdate(party_id, { $set: { gang_player: un_join } }, { new: true })

    return { code: 200, data: updatedGang }
  }

  createGang = async (body) => {
    const { gang_name, gang_detail, gang_address, host, sport_type = null } = body

    const check_dup = await this.Gang.findOne({ gang_name: gang_name, sport_type: sport_type })

    if (check_dup) {
      return { code: 304, message: 'Dupicate Gang' }
    }
    const res = new this.Gang({
      gang_name: gang_name,
      gang_detail: gang_detail,
      gang_address: gang_address,
      host: host,
      status: true,
      sport_type: sport_type,
      create_dt: new Date()
    }).save()

    return { code: 201, data: { ...res } }
  }

  updateGang = async (body) => {
    const { gang_id, gang_name, gang_detail, gang_address, user_id } = body

    const check_user = await this.User.findById({ user_id })

    const check_permission = await this.Gang.findOne({ _id: gang_id, $or: [{ host: check_user.username }, { 'admin.admin_id': check_user._id }] })

    if (!check_permission) {
      return { code: 404, message: 'please check permission' }
    }

    const updatedGang = await this.HisGang.findByIdAndUpdate(
      gang_id,
      {
        $set: {
          gang_name: gang_name,
          gang_detail: gang_detail,
          gang_address: gang_address,
          admin: [...check_permission.admin, { user_id: check_user._id, admin_name: check_user.name }]
        }
      },
      { new: true }
    )

    return { code: 200, data: updatedGang }
  }

  openPartyGang = async (body) => {
    const { gang_id, gang_name, user_id, date, start, end, maximum_palyer } = body

    const get_gang_party_detail = await this.Gang.findOne({
      _id: gang_id,
      gang_name: gang_name,
      $or: [{ host: user_id }, { 'admin.admin_name': user_id }],
      status: true
    })

    if (!get_gang_party_detail) {
      return { code: 404, message: 'No permission for you' }
    }

    const check_create_party = await this.HisGang.findOne({
      gang_id: gang_id,
      gang_party_name: gang_name,
      gane_event_date: date,
      gane_event_time_start: start,
      gane_event_time_end: end
    })

    if (check_create_party) {
      return { code: 403, message: 'open gang dupicate date' }
    }

    const create_party = new this.HisGang({
      gang_id: gang_id,
      gang_party_name: gang_name,
      gane_event_date: date,
      gane_event_time_start: start,
      gane_event_time_end: end,
      gang_player: [],
      maximum_palyer: maximum_palyer,
      create_dt: new Date()
    }).save()

    return { code: 201, data: create_party }
  }

  getHisJoinGang = async (body) => {
    const { user_id } = body

    const check_user_data = await this.User.findOne({ _id: user_id })

    if (!check_user_data) {
      return { code: 404, message: 'invalid user' }
    }

    const check_his_join = await this.HisGang.find({ 'gang_player.user_id': user_id }).sort({ gane_event_date: -1 })

    return { code: 200, data: check_his_join }
  }
}

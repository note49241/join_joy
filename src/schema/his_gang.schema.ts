import * as mongoose from 'mongoose'

export const gang_player = new mongoose.Schema({
  user_id: { type: String, required: true },
  player_name: { type: String, required: true }
})

export const HisGang = new mongoose.Schema({
  gang_id: String,
  gang_party_name: String,
  gane_event_date: String,
  gane_event_time_start: String,
  gane_event_time_end: String,
  maximum_palyer: Number,
  gang_player: { type: [gang_player] }
})

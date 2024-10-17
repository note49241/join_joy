import * as mongoose from 'mongoose'

export const gang_album = new mongoose.Schema({
  img_name: { type: String, required: true },
  img_alt: { type: String }
})

export const gang_admin = new mongoose.Schema({
  user_id: { type: String, required: true },
  admin_name: { type: String, required: true }
})

export const Gang = new mongoose.Schema({
  gang_name: String,
  gang_detail: String,
  gang_qr: String,
  gang_address: String,
  gang_map: String,
  gang_logo: String,
  gang_thumbnail: String,
  gang_album: { type: [gang_album] },
  host: String,
  admin: { type: [gang_admin] },
  status: Boolean,
  create_dt: Date,
  create_by: String,
  update_dt: Date,
  update_by: String
})

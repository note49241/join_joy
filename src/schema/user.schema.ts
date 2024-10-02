import * as mongoose from 'mongoose'

export const User = new mongoose.Schema({
  user_name: String,
  password: String,
  name: String,
  mail: String,
  create_dt: Date,
  update_dt: Date,
  last_login: Date
})

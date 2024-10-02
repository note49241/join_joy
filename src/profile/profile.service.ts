import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class ProfileService {
  constructor(@InjectModel('User') private readonly User: Model<any>) {}
  getHello(): string {
    return 'Hello World!'
  }

  create = async (body) => {
    const { username, name, mail, password } = body

    const check_data_dup = await this.User.findOne({ user_name: username })

    if (check_data_dup) {
      return { code: 403, message: 'dup user' }
    }

    const hashPassword = await bcrypt.hash(password, 10)

    // const comparePass = await bcrypt.compare(password, hashPassword)
    const createUser = new this.User({
      user_name: username,
      name: name,
      password: hashPassword,
      mail: mail,
      create_dt: new Date()
    }).save()

    return createUser
  }

  update = async (body) => {
    const { name, mail } = body

    const check_data = await this.User.findOne({ mail: mail })

    if (check_data) {
      return { code: 403, message: 'not found user' }
    }

    const update_data = await this.User.findByIdAndUpdate(
      check_data._id,
      { $set: { name: name, mail: mail, update_dt: new Date() } },
      { new: true } // Return the updated document
    )

    return update_data
  }

  rePass = async (body) => {
    const { mail, password } = body

    const check_data = await this.User.findOne({ mail: mail })

    if (check_data) {
      return { code: 403, message: 'not found user' }
    }
    const comparePass = await bcrypt.compare(password, check_data.password)

    if (comparePass) {
      return { code: 304, message: 'dupicate password for old password' }
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const update_data = await this.User.findByIdAndUpdate(
      check_data._id,
      { $set: { password: hashPassword, update_dt: new Date() } },
      { new: true } // Return the updated document
    )

    return update_data
  }
}

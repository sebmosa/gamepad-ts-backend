import Uid2 from 'uid2'
import Sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'
import { User } from '../models/User'

export class UserService {
  static async createUser(email: string, username: string, password: string) {
    try {
      if ((await UserService.validEmail(email)) && (await UserService.checkUser(email)) === false) {
        const salt = Uid2(64)
        const hash = Sha256(password + salt).toString(Base64)
        const token = Uid2(64)

        const newUser = new User({
          email,
          account: {
            username,
          },
          token,
          hash,
          salt,
        })
        await newUser.save()
        return {
          _id: newUser._id,
          email: newUser.email,
          token: newUser.token,
          account: newUser.account,
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  static async validEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return emailRegex.test(email) ? true : false
  }

  static async checkUser(email: string) {
    try {
      if (await UserService.validEmail(email)) {
        const checkExist = await User.findOne({ email })
        return checkExist !== null ? true : false
      }
    } catch (error) {
      console.error(error)
    }
  }

  static async validUser(email: string, password: string) {
    try {
      if (await UserService.validEmail(email)) {
        const user = await User.findOne({ email })
        if (user !== null) {
          const newHash = Sha256(password + user.salt).toString(Base64)
          if (user.hash === newHash) {
            return {
              _id: user._id,
              token: user.token,
              account: user.account,
            }
          }
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
}

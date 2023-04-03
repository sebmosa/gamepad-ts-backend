import { Schema, model } from 'mongoose'

interface IUser {
  email: {
    required: true
    unique: true
    type: string
  }
  account: {
    username: {
      required: true
      type: string
    }
    avatar: object
  }
  token: string
  hash: string
  salt: string
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  account: { username: { required: true, type: String }, avatar: Object },
  token: String,
  hash: String,
  salt: String,
})

const User = model<IUser>('User', userSchema)

export { User, IUser }

import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

export class GamepadDB {
  private static _database: GamepadDB
  private constructor() {
    const dbUri = process.env.MONGO_DB_URI
    if (dbUri) {
      mongoose
        .connect(dbUri)
        .then(() => console.log('Connected with gamepad-ts database'))
        .catch(() => console.log('Not connected with gamepad-ts database'))
    }
  }
  static getInstance() {
    if (!this._database) {
      this._database = new GamepadDB()
    }
    return this._database
  }
}

import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { User } from '../models/User'

const mongoServer = MongoMemoryServer.create()
export const connect = async () => {
  const uri = await (await mongoServer).getUri()
  await mongoose.disconnect()
  await mongoose.connect(uri)
}
export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await (await mongoServer).stop()
}
export const clearDatabase = async () => {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
}
export const createUser = async () => {
  User.create({
    email: 'test@mail.com',
    account: { username: 'test' },
    token: 'fyB6M_-ACLHm2zG3Zbfi99__2Q6nymE0npUq4c645DU8JMFGciU9qs-lZFDEgFsu',
    hash: 'W/syPc2sqsfrRsKMrn5IfgjvklAo8buRNlcLE5KgAyk=',
    salt: 'X7HF-yjANccz6To9pWlK-5eVV7YkY2c6SlUUrJes4aQXAeEUrokGZ0yO3fhDQZSl',
  })
}

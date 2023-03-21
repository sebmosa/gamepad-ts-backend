import { test, describe, expect, beforeAll, afterAll, afterEach, beforeEach } from 'vitest'
import { UserService } from '../services/user.service'
import * as db from './db'

beforeAll(async () => {
  await db.connect()
})
beforeEach(async () => {
  await db.createUser()
})
afterEach(async () => {
  await db.clearDatabase()
})
afterAll(async () => {
  await db.closeDatabase()
})


describe('User Service', () => {
  describe('Check user', () => {
    test('when we send email identification, we verify it is present in base', async () => {
      const email = 'test@mail.com'
      const verify = await UserService.checkUser(email)
      expect(verify).toEqual(true)
    })
  })

  describe('Check user not exist', () => {
    test(`when we send email identification of unexisting user, return false`, async () => {
      const email = 'noexist@mail.com'
      const verify = await UserService.checkUser(email)
      expect(verify).toEqual(false)
    })
  })

  describe('Check user error', () => {
    test(`when don't send email identification, return undefined`, async () => {
      const email = ''
      const verify = await UserService.checkUser(email)
      expect(verify).toEqual(undefined)
    })
  })

  describe('Create user', () => {
    test('when we create an account, it return the email address and the username account created', async () => {
      const email = 'test2@mail.com'
      const username = 'test2'
      const password = 'test2password'
      const create = await UserService.createUser(email, username, password)
      expect(create).toMatchObject({ email, account: {username} })
    })
  })

  describe('Create user error', () => {
    test('when we send partial account information, it return undefined', async () => {
      const email = 'test3@mail.com'
      const username = ''
      const password = 'test3password'
      const create = await UserService.createUser(email, username, password)
      expect(create).toEqual(undefined)
    })
  })

  describe('Valid user', () => {
    test('when we send user email and password, after verification return account username', async () => {
      const email = 'test@mail.com'
      const password = 'testpassword'
      const valid = await UserService.validUser(email, password)
      expect(valid).toMatchObject({ account: { username: 'test' } })
    })
  })

})

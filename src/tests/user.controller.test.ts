import {
  test,
  describe,
  expect,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
} from 'vitest'
import { app } from '../app'
import Request from 'supertest'
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

describe('User Controller', () => {
  describe('Login', () => {
    test('when we send valid email and password with authorization, login be succefull', async () => {
      const token =
        'fyB6M_-ACLHm2zG3Zbfi99__2Q6nymE0npUq4c645DU8JMFGciU9qs-lZFDEgFsu'
      const response = await Request(app)
        .post('/login')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'test@mail.com',
          password: 'testpassword',
        })
        .expect('Content-Type', /json/)
      expect(response.statusCode).toEqual(201)
      expect(response.body).toMatchObject({
        token:
          'fyB6M_-ACLHm2zG3Zbfi99__2Q6nymE0npUq4c645DU8JMFGciU9qs-lZFDEgFsu',
      })
    })

    test('when we send invalid email and password, return invalid user', async () => {
      const token =
        'fyB6M_-ACLHm2zG3Zbfi99__2Q6nymE0npUq4c645DU8JMFGciU9qs-lZFDEgFsu'
      const response = await Request(app)
        .post('/login')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'test2@mail.com',
          password: 'test2password',
        })
        .expect('Content-Type', /json/)
      expect(response.statusCode).toEqual(400)
      expect(response.body).toEqual({
        msg: 'Invalid user'
      })
    })

    test('when we send invalid token, return error', async () => {
      const token = 'invalidtoken'
      const response = await Request(app)
        .post('/login')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'test@mail.com',
          password: 'testpassword',
        })
        .expect('Content-Type', /json/)
      expect(response.statusCode).toEqual(401)
      expect(response.body).toEqual({ msg: 'Unauthorized' })
    })
  })

  test("when we d'ont send token, return error", async () => {
    const response = await Request(app)
      .post('/login')
      .send({
        email: 'test@mail.com',
        password: 'testpassword',
      })
      .expect('Content-Type', /json/)
    expect(response.statusCode).toEqual(401)
    expect(response.body).toEqual({ msg: 'Unauthorized' })
  })

  describe('signUp', () => {
    test('when we send valid email, username and password for a an account no existing, create a new account', async () => {
      const response = await Request(app)
        .post('/signup')
        .send({
          email: 'test2@mail.com',
          username: 'test2',
          password: 'test2password',
        })
        .expect('Content-Type', /json/)
      expect(response.statusCode).toEqual(201)
      expect(response.body).toMatchObject({
        email: 'test2@mail.com',
        account: {
          username: 'test2',
        },
      })
    })

    test('when we send existing email, return account existing', async () => {
      const response = await Request(app)
        .post('/signup')
        .send({
          email: 'test@mail.com',
          username: 'test',
          password: 'testpassword',
        })
        .expect('Content-Type', /json/)
      expect(response.statusCode).toEqual(400)
      expect(response.body).toEqual({ msg: 'Account existing' })
    })

    test('when we omit username, return missing parameter(s)', async () => {
      const response = await Request(app)
        .post('/signup')
        .send({
          email: 'test@mail.com',
          password: 'testpassword',
        })
        .expect('Content-Type', /json/)
      expect(response.statusCode).toEqual(400)
      expect(response.body).toEqual({ msg: 'Missing parameter(s)' })
    })

    test('when we send nothing, return error, sign up unsuccesful', async () => {
      const response = await Request(app)
        .post('/signup')
        .expect('Content-Type', /json/)
      expect(response.statusCode).toEqual(400)
      expect(response.body).toEqual({ msg: 'Missing parameter(s)' })
    })
  })
})

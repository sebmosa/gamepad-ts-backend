import { app } from '../app'
import Request from 'supertest'
import { it, describe, expect } from 'vitest'

describe('Server connection', () => {
  it('Server send a response', async () => {
    const response = await Request(app).get('/')
    expect(response.statusCode).toEqual(200)
    expect(response.text).toEqual('Welcome on Gamepad-TS API')
  })
})

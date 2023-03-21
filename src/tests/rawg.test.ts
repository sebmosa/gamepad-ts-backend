import { app } from '../app'
import Request from 'supertest'
import { test, describe, expect } from 'vitest'

describe('Send platforms from RAWG', () => {
  test('send the list of platforms', async () => {
    const response = await Request(app)
      .get('/platforms')
      .expect('Content-Type', /json/)
    expect(response.statusCode).toEqual(200)
    expect(response.body[0].slug).toEqual('pc')
  })
})

describe('Send genres from RAWG', () => {
  test('send the list of genres', async () => {
    const response = await Request(app)
      .get('/genres')
      .expect('Content-Type', /json/)
    expect(response.statusCode).toEqual(200)
    expect(response.body[0].slug).toEqual('action')
  })
})

describe('Send a custom game list from RAWG', () => {
  test('send a custom game list', async () => {
    const response = await Request(app)
      .get(
        '/games?page_size=1&page=1&search=xenoblade+chronicles+3&search_precise=true&platforms=7&genres=5&metacritic=0%2C100&ordering=rating'
      )
      .expect('Content-Type', /json/)
    expect(response.statusCode).toEqual(200)
    expect(response.body.results[0].slug).toEqual('xenoblade-chronicles-3')
  })
})

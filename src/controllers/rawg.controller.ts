import axios from 'axios'
import { Request, Response } from 'express'
import { RawgService } from '../services/rawg.service.js'
import {
  CustomSchema,
  GameSchema,
  GenreSchema,
  PlatformSchema,
} from '../types/rawg.type.js'

// Rawg requests parameters
const apiUrl = 'https://api.rawg.io/api'
const key = process.env.RAWG_API_KEY

export class RawgController {
  static async getPlatforms(req: Request, res: Response) {
    try {
      const response = await axios.get(`${apiUrl}/platforms?key=${key}`)
      const result = PlatformSchema.parse(response.data)
      const platforms = result.results.map((platform) => {
        return { id: platform.id, name: platform.name, slug: platform.slug }
      })
      res.status(200).json(platforms)
    } catch (error) {
      res.status(400).json({
        errors: [{ msg: 'Bad request for platforms list' }],
      })
    }
  }

  static async getGenres(req: Request, res: Response) {
    try {
      const response = await axios.get(`${apiUrl}/genres?key=${key}`)
      const result = GenreSchema.parse(response.data)
      const genres = result.results.map((genre) => {
        return { id: genre.id, name: genre.name, slug: genre.slug }
      })
      res.status(200).json(genres)
    } catch (error) {
      res.status(400).json({
        errors: [{ msg: 'Bad request for genres list' }],
      })
    }
  }

  static async getCustomGamelist(req: Request, res: Response) {
    try {
      const page_size = req.query.page_size as string
      const page = req.query.page as string
      const search = req.query.search as string
      const platforms = req.query.platforms
      const genres = req.query.genres
      const rating = req.query.metacritic as string
      const sort = req.query.ordering as string

      const rawgRequest = `${apiUrl}/games?key=${key}&page_size=${page_size}&page=${page}&search=${search}&search_precise=true${
        search ? `&platforms=${platforms}` : ''
      }${
        search ? `&genres=${genres}` : ''
      }&metacritic=${rating}&ordering=${sort}`

      console.log('rawgRequest:', rawgRequest)

      const response = await axios.get(rawgRequest)

      const result = CustomSchema.parse(response.data)

      let next_page = null

      if (result.next !== null) {
        next_page = result.next
      }

      const api_next = RawgService.apiFormat(next_page)

      let previous_page = null

      if (result.previous !== null) {
        previous_page = result.previous
      }

      const api_previous = RawgService.apiFormat(previous_page)

      const customGameList = {
        count: result.count,
        next: api_next,
        previous: api_previous,
        results: result.results.map((el) => {
          return {
            id: el.id,
            name: el.name,
            slug: el.slug,
            released: el.released,
            background_image: el.background_image,
            rating: el.rating,
            metacritic: el.metacritic,
            platforms: el.platforms.map((el) => {
              return {
                id: el.platform.id,
                name: el.platform.name,
                slug: el.platform.slug,
              }
            }),
          }
        }),
      }

      res.status(200).json(customGameList)
    } catch (error) {
      res.status(400).json({
        errors: [{ msg: 'Error from RAWG API' }],
      })
    }
  }

  static async getGameDetails(req: Request, res: Response) {
    const id = req.params.id

    try {
      const response = await axios.get(`${apiUrl}/games/${id}?key=${key}`)
      const result = GameSchema.parse(response.data)

      const gameDetails = {
        id: result.id,
        name: result.name,
        slug: result.slug,
        description: result.description_raw,
        rating: result.rating,
        metacritic: result.metacritic,
        released: result.released,
        background_image: result.background_image,
        background_image_additional: result.background_image_additional,
        metacritic_url: result.metacritic_url,
        platforms: result.platforms.map((el) => {
          return {
            id: el.platform.id,
            name: el.platform.name,
            slug: el.platform.slug,
          }
        }),
        genres: result.genres,
        developers: result.developers,
        publishers: result.publishers,
        esrb_rating: result.esrb_rating,
      }

      res.status(200).json(gameDetails)
    } catch (error) {
      res.status(400).json({
        errors: [{ msg: 'Bad request for game details' }],
      })
    }
  }
}

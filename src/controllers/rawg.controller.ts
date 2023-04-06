import { Request, Response } from 'express'
import axios from 'axios'
import {
  PlatformSchema,
  GenreSchema,
  CustomSchema,
  AllSchema,
} from '../types/rawg.type.js'
import { RawgService } from '../services/rawg.service.js'

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
      const rating = req.query.rating as string
      const sort = req.query.sort as string

      let rawgRequest = ''

      if (genres === '' || platforms === '') {
        rawgRequest = `${apiUrl}/games?key=${key}&page_size=${page_size}&page=${page}&search=${search}&search_precise=true&metacritic=${rating}&ordering=${sort}`
      } else {
        rawgRequest = `${apiUrl}/games?key=${key}&page_size=${page_size}&page=${page}&search=${search}&search_precise=true&platforms=${platforms}&genres=${genres}&metacritic=${rating}&ordering=${sort}`
      }

      const response = await axios.get(rawgRequest)

      const result =
        genres === '' || platforms === ''
          ? AllSchema.parse(response.data)
          : CustomSchema.parse(response.data)

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
}

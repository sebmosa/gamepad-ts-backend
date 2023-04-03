import { Request, Response } from 'express'
import axios from 'axios'
import { PlatformSchema, GenreSchema, CustomSchema } from '../types/rawg.type'

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
      const pageSize = req.query.page_size as string
      const pageNumber = req.query.page as string
      const search = req.query.search as string
      const platforms = req.query.platforms as string
      const genres = req.query.genres as string
      const rating = req.query.rating as string
      const sort = req.query.sort as string

      const response = await axios.get(`${apiUrl}/games?key=${key}&page_size=${pageSize}&page=${pageNumber}&search=${search}&search_precise=true&platforms=${platforms}&genres=${genres}&metacritic=${rating}&ordering${sort}`)

      // Use of safeParse for adjusting zodSchema
      const result = CustomSchema.safeParse(response.data)

      if (!result.success) {
        res.status(400).json(result.error)
      } else {
        const customGameList = result.data
        res.status(200).json(customGameList)
      }
    } catch (error) {
      res.status(400).json({
        errors: [{ msg: 'Error from RAWG API' }],
      })
    }
  }
}

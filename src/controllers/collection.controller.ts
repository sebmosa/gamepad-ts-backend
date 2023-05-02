import { Request, Response } from 'express'
import { CollectionService } from '../services/collection.service.js'

export class CollectionController {
  static async addToCollection(req: Request, res: Response) {
    try {
      const game = req.body

      const { owner, gameId, name, image } = game

      const gameAdded = await CollectionService.addGame(owner, gameId, name, image)
      res.status(201).json(gameAdded)
    } catch (error) {
      res.status(400).json({
        errors: [{ msg: 'Error, game not added.', error }],
      })
    }
  }

  static async removeFromCollection(req: Request, res: Response) {
    try {
      const game = req.body

      const { owner, gameId } = game

      const gameRemoved = await CollectionService.removeGame(owner, gameId)
      res.status(201).json(gameRemoved)
    } catch (error) {
      res.status(400).json({
        errors: [{ msg: 'Error, game not removed.', error }],
      })
    }
  }

  static async getCollection(req: Request, res: Response) {
    try {
      const owner = req.params.id

      const fetchedCollection = await CollectionService.getCollection(owner)
      res.status(201).json(fetchedCollection)
    } catch (error) {
      res.status(400).json({
        errors: [{ msg: 'Error, collection not finded.', error }],
      })
    }
  }
}

import { RawgController } from '../controllers/rawg.controller.js'
import { Router } from 'express'

const RawgRoute = Router()

RawgRoute.get('/platforms', RawgController.getPlatforms)

RawgRoute.get('/genres', RawgController.getGenres)

RawgRoute.get('/games', RawgController.getCustomGamelist)

RawgRoute.get('/games/:id', RawgController.getGameDetails)

export { RawgRoute }

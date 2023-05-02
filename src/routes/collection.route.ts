import { Router } from 'express'
import { CollectionController } from '../controllers/collection.controller.js'

const CollectionRoute = Router()

CollectionRoute.post('/collection', CollectionController.addToCollection)

CollectionRoute.put('/collection', CollectionController.removeFromCollection)

CollectionRoute.get('/collection/:id', CollectionController.getCollection)

export { CollectionRoute }

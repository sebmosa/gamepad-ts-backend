import { Router } from 'express'
import { UserController } from '../controllers/user.controller.js'
import { upload } from '../middlewares/upload.js'

const UserRoute = Router()

UserRoute.post('/signup', upload, UserController.signUp)

UserRoute.post('/login', UserController.login)

export { UserRoute }

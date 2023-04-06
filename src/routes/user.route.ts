import { UserController } from '../controllers/user.controller.js'
import { Router } from 'express'
import { authentification } from '../middlewares/auth.js'

const UserRoute = Router()

UserRoute.post('/signup', UserController.signUp)

UserRoute.post('/login', authentification, UserController.login)

export { UserRoute }

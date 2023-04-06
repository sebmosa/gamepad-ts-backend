import { Request, Response } from 'express'
import { UserService } from '../services/user.service.js'
import { BaseUser } from '../types/user.type'

export class UserController {
  static async signUp(req: Request, res: Response) {
    try {
      const user: BaseUser = req.body

      const { email, username, password } = user

      if (typeof email === 'string' && typeof username === 'string' && typeof password === 'string') {
        const userExist = await UserService.checkUser(email)

        if (userExist) {
          res.status(400).json({ msg: 'Account existing' })
        } else {
          const newUser = await UserService.createUser(email, username, password)
          res.status(201).json(newUser)
        }
      } else {
        res.status(400).json({ msg: 'Missing parameter(s)' })
      }
    } catch (error) {
      res.status(400).json({
        errors: [{ msg: 'Error, sign up unsuccesful', error }],
      })
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const user: BaseUser = req.body

      const { email, password } = user

      if (typeof email === 'string' && typeof password === 'string') {
        const userExist = await UserService.checkUser(email)

        if (userExist) {
          const verifiedUser = await UserService.validUser(email, password)
          res.status(201).json(verifiedUser)
        } else {
          res.status(400).json({ msg: 'Invalid user' })
        }
      }
    } catch (error) {
      res.status(400).json({ msg: 'Error, login unsuccesful' })
    }
  }
}

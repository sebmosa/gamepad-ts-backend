import { Request, Response, NextFunction } from 'express'
import { User, IUser } from '../models/User'

export interface UserRequest extends Request {
  user?: IUser
}

export const authentification = async (req: UserRequest, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.replace('Bearer ', '')
    const user = await User.findOne({ token })

    if (user !== null) {
      req.user = user
      return next()
    } else {
      return res.status(401).json({ msg: 'Unauthorized' })
    }
  } else {
    return res.status(401).json({ msg: 'Unauthorized' })
  }
}

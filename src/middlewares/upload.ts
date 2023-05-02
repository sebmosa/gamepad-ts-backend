import { v2 as cloudinary } from 'cloudinary'
import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import { CloudinaryStorage, Options } from 'multer-storage-cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Workaround for undeclared types in multer-storage-cloudinary
interface ICloudinaryOptions extends Options {
  params: {
    folder: string
    allowedFormats: [string]
    format: string
    transformation: {
      width: number
      height: number
      crop: string
      gravity: string
    }[]
  }
}

const multerOpts: ICloudinaryOptions = {
  cloudinary,
  params: {
    folder: 'gamepad-ts/users',
    allowedFormats: ['png'],
    format: 'png',
    transformation: [{ width: 100, height: 100, crop: 'thumb', gravity: 'face' }],
  },
}

const storage = new CloudinaryStorage(multerOpts)

const parser = multer({ storage })

export const upload = (req: Request, res: Response, next: NextFunction) => {
  parser.single('avatar')(req, res, (err) => {
    console.log('UPLOAD MIDDLEWARE:', req.body)
    if (err) {
      return res.status(400).json({ error: err.message })
    }

    if (!req.body.avatar) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    console.log('/// req.file: ///', req.body.avatar)

    next()
  })
}

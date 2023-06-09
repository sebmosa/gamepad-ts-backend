/**
 * Required External Modules
 */

import compression from 'compression'
import cors from 'cors'
import express from 'express'
import { GamepadDB } from '../src/config/db.js'
import { CollectionRoute } from './routes/collection.route.js'
import { RawgRoute } from './routes/rawg.route.js'
import { UserRoute } from './routes/user.route.js'

/**
 * App Variables
 */

const app = express()

/**
 *  App Configuration
 */

app.use(cors())
app.use(compression())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/**
 * DB Connection
 */

GamepadDB.getInstance()

/**
 * App Routes
 */

app.use('/', RawgRoute)
app.use('/', UserRoute)
app.use('/', CollectionRoute)

/**
 * App Homepage
 */

app.get('/', (req, res) => res.status(200).send('Welcome on Gamepad-TS API'))

/**
 * 404
 */

app.all('*', function (req, res) {
  res.json({ message: 'Page not found' })
})

export { app }

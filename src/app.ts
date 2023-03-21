/**
 * Required External Modules
 */

import cors from 'cors'
import express from 'express'
import { GamepadDB } from '../src/config/db'
import { RawgRoute } from './routes/rawg.route'
import { UserRoute } from './routes/user.route'

/**
 * App Variables
 */

const app = express()

/**
 *  App Configuration
 */

app.use(cors())
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

/**
 * App Homepage
 */

app.get('/', (req, res) => res.status(200).send('Welcome on Gamepad-TS API'))

/**
 * 404
 */

app.all('*', function(req, res) {
  res.json({ message: 'Page not found' })
})

export { app }

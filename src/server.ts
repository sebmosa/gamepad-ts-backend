import { app } from './app'

/**
 * Server Activation
 */

const port = process.env.PORT

try {
  app.listen(port, (): void => {
    console.log(`Gamepad-TS API launched on port ${port} 👾`)
  })
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error occured: (${error.message})`)
  }
}

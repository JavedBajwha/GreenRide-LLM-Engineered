import { createApp } from './app.js'

const PORT = process.env.PORT || 4000

async function bootstrap() {
  const app = createApp()

  app.listen(PORT, () => {
    console.log(`🚀 GreenRide backend running on port ${PORT}`)
  })
}

bootstrap()

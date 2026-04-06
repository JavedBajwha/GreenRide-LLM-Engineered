import express from 'express'
import routes from './routes/index.next.js'

export function createApp() {
  const app = express()

  app.use(express.json())

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
  })

  app.use('/api', routes)

  return app
}

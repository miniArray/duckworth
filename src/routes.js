import { Router } from 'express'
const routes = Router()

import watson from './routes/watson'
import acapela from './routes/acapela'

/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.render('index', { title: 'Express Babel' })
})

/**
 * GET /api/tts
 *
 * Get wave file from IBM Watston
 localhost:9999/api/tts?text=hello&voice=en-GB_KateVoice&id=8790afaw4f
 */
routes.get('/api/tts/watson', watson)
routes.get('/api/tts/acapela', acapela)

export default routes

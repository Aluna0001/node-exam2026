import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { sessionMiddleware } from './middleware/sessionConfig.js'
import { generalLimiter, authLimiter } from './middleware/rateLimiters.js'

import authRoutes from './routes/authRoutes.js'
import tarotRoutes from './routes/tarotRoutes.js'
import signupRoutes from './routes/signupRoutes.js'

const app = express()

app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)

app.use(helmet())

app.use(sessionMiddleware)

app.use(generalLimiter)

// Static files after security, but before routes
app.use('/images', express.static('./public/images'))

app.use('/auth', authLimiter)
app.use(authRoutes)
app.use(tarotRoutes)
app.use(signupRoutes)

app.use(express.static('./../client/dist'))

app.all('/{*splat}', (req, res) => {
  res.send({ data: 'Nothing to see here' })
})

const PORT = Number(process.env.PORT) || 8080

app.listen(PORT, () => {
  console.log('Server is running on port:', PORT)
})

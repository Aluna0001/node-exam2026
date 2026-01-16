import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { sessionMiddleware } from './middleware/sessionConfig.js'
import { generalLimiter, authLimiter } from './middleware/rateLimiters.js'

import authRoutes from './routes/authRoutes.js'

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

app.use('/auth', authLimiter)
app.use(authRoutes)

app.use(express.static('./../client/dist'))

app.all('/{*splat}', (req, res) => {
  res.send({ data: 'Nothing to see here' })
})

const PORT = Number(process.env.PORT) || 8080

app.listen(PORT, () => {
  console.log('Server is running on port:', PORT)
})

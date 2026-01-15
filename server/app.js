import express from 'express'

const app = express()

app.use(express.static('./../client/dist'))

const PORT = 8080

app.listen(PORT, () => {
  console.log('Server is running in port:', PORT)
})

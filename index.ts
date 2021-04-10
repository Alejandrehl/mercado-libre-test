import express from 'express'
import path from 'path'
import cors from 'cors'
import ItemRoutes from './routes/items'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use('/api/items', ItemRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')),
  )
}

app.listen(PORT, () => console.log(`Listening port ${PORT}`))

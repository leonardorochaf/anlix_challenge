import express from 'express'
import { initRoutes } from './routes/router'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initRoutes(app)

export { app }

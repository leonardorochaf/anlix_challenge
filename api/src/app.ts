import express from 'express'
import cors from 'cors'

import { initRoutes } from './routes/router'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

initRoutes(app)

export { app }

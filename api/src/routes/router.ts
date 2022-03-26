import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

export const initRoutes = (app: Express): void => {
  const router = Router()
  readdirSync(join(__dirname, '../routes'))
    .filter(file => !file.endsWith('.map') && file !== 'router.js' && file !== 'router.ts')
    .map(async file => {
      (await import(`../routes/${file}`)).default(router)
    })

  app.use('/api/v1', router)
}

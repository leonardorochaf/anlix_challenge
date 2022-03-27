import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'
import swaggerUi from 'swagger-ui-express'

import { env } from '@/config/env'
import { swaggerConfig } from '@/docs'

export const initRoutes = (app: Express): void => {
  const router = Router()
  readdirSync(join(__dirname, '../routes'))
    .filter(file => !file.endsWith('.map') && file !== 'router.js' && file !== 'router.ts')
    .map(async file => {
      (await import(`../routes/${file}`)).default(router)
    })

  app.use('/api/v1', router)

  if (env.NODE_ENV !== 'production') {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))
  }
}

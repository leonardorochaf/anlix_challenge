import './config/module-alias'

import { env } from '@/config/env'
import { PgConnection } from '@/database'

PgConnection.getInstance().connect()
  .then(async () => {
    console.log('Connected to db')
    const { app } = await import('./app')
    app.listen(env.APP.PORT, () => console.log(`Server running on port ${env.APP.PORT}`))
  })
  .catch(e => {
    console.error(e)
  })

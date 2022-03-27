import paths from '@/docs/paths'
import * as schemas from '@/docs/schemas'

export const swaggerConfig = {
  openapi: '3.0.1',
  info: {
    version: '0.1.0',
    title: 'Anlix API',
    description: 'Api do desafio anlix'
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Local server'
    }
  ],
  paths,
  schemas: {
    ...schemas
  }
}

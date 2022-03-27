export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  APP: {
    PORT: process.env.PORT ?? '3000'
  }
}

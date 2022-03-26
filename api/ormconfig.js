const rootDir = process.env.NODE_ENV === 'production' ? 'dist' : 'src'
const log = process.env.NODE_ENV === 'production'

require(`./${rootDir}/config/module-alias`)

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: process.env.DB_PORT ?? '5432',
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'root',
  database: 'anlix_challenge',
  logging: log,
  entities: [
    `${rootDir}/repositories/postgres/models/index.{js,ts}`
  ],
  migrations: [
    `${rootDir}/database/migrations/*.{js,ts}`
  ],
  cli: {
    migrationsDir: `${rootDir}/database/migrations`
  }
}

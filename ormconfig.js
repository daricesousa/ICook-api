const typeormConfig = {
  "ssl": false,
  // "extra": {
  //   "ssl":{
  //     "rejectUnauthorized": false
  //   }
  // },
  "type": "postgres",

  "database": process.env.DATABASE,
  "username": process.env.DATABASE_USERNAME,
  "port": "5432",
  "password": process.env.PASSWORD,
  "host": process.env.HOST,
  "migrations": [
    // "./src/database/migrations/*.{ts, js}",
    `./${process.env.NODE_ENV === 'dev' ? 'src' :'dist'}/database/migrations/*.${process.env.NODE_ENV === 'dev' ? 'ts' :'js'}`,
  ],
  "entities": [
    // "./src/models/*.{ts, js}",
    `./${process.env.NODE_ENV === 'dev' ? 'src' :'dist'}/models/*.${process.env.NODE_ENV === 'dev' ? 'ts' :'js'}`,
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations/"
  }
}

module.exports = typeormConfig;
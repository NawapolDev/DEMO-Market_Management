var db = require('knex')({
  client: process.env.CLIENT,
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    charset: process.env.CHARSET,

  }
})

module.exports = { db } 
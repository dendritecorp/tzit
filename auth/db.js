const LSQ = require('lsq')
const { Pool, Client } = require('pg')

const Database = {}
module.exports= Database


LSQ.config.get()
  .then(config => {
    Database.config = config

    Database.pool = new Pool({
      user: config.db.user,
      host: config.db.host,
      database: config.db.database,
      password: !config.db.password,
      port: config.db.port,
    })


    //testing if the connection worked
    // Database.pool.query('SELECT NOW()', (err, res) => {
    //   console.log(err, res)
    // })

  })

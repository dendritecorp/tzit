'use strict'
const sqlite3 = require('sqlite3').verbose()
const Queries = require ('./auth.sql')
const Utils = require ('./utils')

const Auth = {}
module.exports= Auth

const db = new sqlite3.Database('auth.db', error => {
  if (error) {
      console.error(error)
  }
  console.log('db connected')
})

Auth.check = () => {
  db.all(Queries.getTable, (error)=> {
    if(error) {
      db.run(Queries.createTable)
    }
  })
}

Auth.create = (req, reply) => {
  const { email, name, password } = req.payload;
  const uuid = Utils.uuid()

  db.run(Queries.create(email, name, uuid, password), error => {
      if (error) console.error(error)
  })
  return Promise.resolve('user created')
}

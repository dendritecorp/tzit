const Boom = require('boom')
const Shajs = require('sha.js')
const Database = require('./db')
const Queries = require ('./queries.js')

const Auth = {};
module.exports = Auth;

const dbCheck = () => {
  return new Promise((resolve, reject) => {
    Database.pool.query(Queries.getTable, (error, result) => {
      if(error) {
        console.log('creating table');
        Database.pool.query(Queries.createTable, (error, result) => {
          if (error) console.log(error)
        })
      }
      else {
        console.log('table exists')
      }
      return resolve('dbCheck complete')
    })
  })
}

const userExists = (email) => {
  return Database.pool.query(Queries.userExists(email), (error, result) => {
    console.log({email});
    if (error) return reject(error)
    if(result.rows.length) return true
    return false
  })
}

Auth.createUser = (request, reply) => {
  const user = request.payload
  return dbCheck()
  .then(userExists(user.email))
  // .then(Database.pool.query(Queries.userExists(user.email)))
  .then((userFound) => {
    console.log({userFound});
    if (userFound) {
      reply('Account with that email address already exists!')
      return
    }
    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ') + ' UTC'
    const salt = Shajs('sha256').update(Math.random().toString()).digest('hex')
    const hashedPassword = Shajs('sha256').update(user.password + salt).digest('hex')
    Database.pool.query(Queries.createUser(user.email, hashedPassword, salt, created_at), (error, result) => {
      if (error) return reply(Boom.badRequest(error.message))
      reply('User created!')
    })
  })
  .catch(err => console.error('Error log:', err.stack))
}

Auth.userLogIn = (request, reply) => {
  const reqEmail = request.payload.email
  const reqPass = request.payload.password
  Database.pool.query(Queries.getUserSalt(reqEmail))
  .then((response) => {
    const dbSalt = response.rows[0].salt
    const hashedReqPass = Shajs('sha256').update(reqPass + dbSalt).digest('hex')
    Database.pool.query(Queries.userLogIn(reqEmail, hashedReqPass), (err, result) => {
      console.log('yo');
      if (result.rows.length) {
        return reply(`Logged in as ${result.rows[0].email}!`)
      }
      reply('Incorrect username or password!')
    })
  })
  .catch(err => console.error('Error executing query', err.stack))
}

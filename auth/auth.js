'use strict'
const Boom = require('boom')
const Iron = require('iron')
const crypto = require('crypto')
const Queries = require ('./auth.sql')
const Database = require('./db')
const Utils = require ('./utils')

const SALT_ROUNDS = 10

const Auth = {}
module.exports= Auth

Auth.check = (req, reply) => {
  Database.pool.query(Queries.getTable, (error, result) => {
    if(error) {
      Database.pool.query(Queries.createTable, (error, result) => {
      })
    }
    reply('db checking')
  })
}

Auth.create = (req, reply) => {
  const { email, name, password } = req.payload;
  const uuid = Utils.uuid()

  return passwordEncrypt(password)
    .then(passwordEncrypted => {
      Database.pool.query(Queries.create(email, name, uuid, passwordEncrypted), (error, result) => {
        if (error) return reply(Boom.badRequest(error))
        reply('user created')
      })
    })
    .catch(error => reply(Boom.badRequest(error)))
}

Auth.login = (req, reply) => {
  const { email, password } = req.payload;

  return Database.pool.query(Queries.get(email))
    .then(result => {
      if(result.rows[0]) return result.rows[0]
      else throw Error('user not found')
    })
    .then(user => {
      const passwordEncrypted = passwordEncrypt2(password)
      if(user.password === passwordEncrypted) return user
      else throw Error('email or password incorrect')
    })
    .then(user => Object.assign({}, {email: user.email, name: user.name, uuid: user.uuid }))
    .then(user => {
      return Iron.seal(user, Database.config.secret, Iron.defaults)
      .then(session => {
        return Object.assign({}, {user: user}, {session: session})
      })
    })
    .then(userAndSession => reply(userAndSession.user).state('session', userAndSession.session, { encoding: 'none' }))
    .catch(error => reply(Boom.badRequest(error)))
}

function passwordEncrypt2(password) {
    return crypto.createHmac('sha256', Database.config.secret)
      .update(password)
      .digest('hex')
}

function passwordEncrypt(password) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHmac('sha256', Database.config.secret)
      .update(password)
      .digest('hex')
    resolve(hash)
  })

}
function sealing(data) {
  return new Promise((resolve, reject) => {
    Iron.seal(data, Database.config.secret, Iron.defaults, function(err, sealed){
      console.log(err, sealed)
      if(err) reject(err)
      resolve(sealed)
    })
  })
}

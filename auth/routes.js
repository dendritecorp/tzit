const Toobusy = require('toobusy-js')
const Joi = require('joi')

const routes = []
module.exports = routes

const Auth = require('./auth.js')

routes.push({
  method: 'GET',
  path:'/health',
  handler: (request, reply) => {
    reply(Toobusy.lag()+"")
  }
})

routes.push({
  method: 'POST',
  path:'/signup',
  config: {
    tags: ['api'],
    validate: {
      payload: Joi.object().keys({
          email: Joi.string().email().required().max(100),
          password: Joi.string().required()
        })
    }
  },
  handler: Auth.createUser
})

routes.push({
  method: 'POST',
  path:'/login',
  config: {
    tags: ['api'],
    validate: {
      payload: Joi.object().keys({
          email: Joi.string().required(),
          password: Joi.string().required()
        })
    }
  },
  handler: Auth.userLogIn
})
//
// routes.push({
//   method: 'GET',
//   path:'/auth/create',
//   config: { tags: ['api'] },
//   handler: Auth.getUsers
// })

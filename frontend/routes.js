const Toobusy = require('toobusy-js')
const Joi = require('joi')

const Handlers = require('./handlers')

const routes = []
module.exports = routes

routes.push({
  method: 'GET',
  path:'/health',
  handler: (request, reply) => {
    reply(Toobusy.lag()+"")
  }
})

routes.push({
  method: 'GET',
  path: '/js/{param*}',
  handler: {
    directory: {
      path: 'public/js',
    },
  }
})

routes.push({
  method: 'GET',
  path:'/',
  handler: Handlers.webIndexPage
})

routes.push({
  method: 'POST',
  path:'/',
  config: {
    validate: {
      payload: {
        user: Joi.string().required(),
        tweet: Joi.string().required().max(140)
      }
    }
  },
  handler: Handlers.webCreateTweet
})

routes.push({
  method: 'GET',
  path:'/view/{id}',
  handler: Handlers.webViewTweet
})

routes.push({
  method: 'POST',
  path:'/delete/{id}',
  handler: Handlers.webDeleteTweet
})

routes.push({
  method: 'POST',
  path:'/update/{id}',
  config: {
    validate: {
      payload: {
        text: Joi.string().required().max(140)
      }
    }
  },
  handler: Handlers.webUpdateTweet
})

routes.push({
  method: 'GET',
  path:'/signup',
  handler: Handlers.webSignUp
})

routes.push({
  method: 'POST',
  path:'/signup',
  config: {
    validate: {
      payload: Joi.object().keys({
          email: Joi.string().required().max(100),
          password: Joi.string().required()
        })
    }
  },
  handler: Handlers.signUp
})

routes.push({
  method: 'GET',
  path:'/login',
  handler: Handlers.webLogIn
})

routes.push({
  method: 'POST',
  path:'/login',
  config: {
    validate: {
      payload: Joi.object().keys({
          email: Joi.string().required().max(100),
          password: Joi.string().required()
        })
    }
  },
  handler: Handlers.logIn
})

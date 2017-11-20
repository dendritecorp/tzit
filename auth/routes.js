const Toobusy = require('toobusy-js')
const Joi = require('joi')
const routes = [];
module.exports = routes

const Auth = require('./auth')

routes.push({
    method: 'POST',
    path:'/api/auth',
    config: {
        tags: ['api'],
        validate: {
            payload: {
                email: Joi.string().email().required(),
                name: Joi.string().required(),
                password: Joi.string().required(),
            }
        },
        handler: Auth.create
    }
});

routes.push({
    method: 'POST',
    path:'/api/auth/login',
    config: {
        tags: ['api'],
        validate: {
            payload: {
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            }
        },
        handler: Auth.login
    }
});


routes.push({
    method: 'GET',
    path:'/api/db/check',
    config: {
        tags: ['api'],
        handler: Auth.check
    }
});

routes.push({
  method: 'GET',
  path:'/health',
  handler: (request, reply) => {
    reply(Toobusy.lag()+"")
  }
})

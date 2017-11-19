const Toobusy = require('toobusy-js')

const Joi = require('joi')
const routes = [];
module.exports = routes

const Api = require('./api')

routes.push({
    method: 'GET',
    path:'/api/tweets',
    config: {
        tags: ['api'],
        handler: Api.getTweetsAPI
    }
});
routes.push({
    method: 'GET',
    path:'/health',
    handler: (request, reply) => {
         reply(Toobusy.lag()+"")
    }
});

routes.push({
    method: 'GET',
    path:'/api/tweets/{id}',
    config: {
        tags: ['api'],
        validate: {
            params: {
                id: Joi.string().min(2).max(100).required()
            }
        },
        handler: Api.getTweetsAPI
    }
});

routes.push({
    method: 'POST',
    path:'/api/tweets',
    config: {
        tags: ['api'],
        validate: {
            payload: {
                user: Joi.string().required(),
                tweet: Joi.string().required()
            }
        },
        handler: Api.createTweetsAPI
    }
});

routes.push({
    method: 'PUT',
    path:'/api/tweets/{id}',
    config: {
        tags: ['api'],
        validate: {
            params: {
                id: Joi.string().min(2).max(100).required()
            },
            payload: {
                user: Joi.string().required(),
                tweet: Joi.string().required()
            }
        },
        handler: Api.updateTweetsAPI
    }
});

routes.push({
    method: 'DELETE',
    path:'/api/tweets/{id}',
    config: {
        tags: ['api'],
        validate: {
            params: {
                id: Joi.string().min(2).max(100).required()
            }
        },
        handler: Api.deleteTweetAPI
    }
});

const Toobusy = require('toobusy-js')
const Joi = require('joi')
const routes = [];
module.exports = routes

const Handlers = require('./handlers')
routes.push({
    method: 'GET',
    path: '/delete/{id}',
    config: {
        validate: {
            params: {
                id: Joi.string().min(2).max(100).required()
            }
        },
        handler: Handlers.deleteTweetWEB
    }
});

routes.push({
    method: 'POST',
    path:'/update/{id}',
    config: {
        validate: {
            params: {
                id: Joi.string().min(2).max(100).required()
            }
        },
        handler: Handlers.updateTweetsWEB
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
    path:'/',
    handler: Handlers.getTweetsWEB
});
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
    path:'/{id}',
    handler: Handlers.getOneTweetWEB

});

routes.push({
    method: 'POST',
    path:'/create',
    config: {
        validate: {
            payload: {
                user: Joi.string().required(),
                tweet: Joi.string().required()
            }
        },
        handler: Handlers.createTweetsWEB
    },

});
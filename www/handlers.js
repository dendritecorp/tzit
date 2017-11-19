const Boom = require('boom');
const Request = require('request-promise');

const Utils = require('./utils');
const LSQ = require('lsq');


const Handlers = {};
module.exports = Handlers;

Handlers.getTweetsWEB = (req, reply) => {
    return LSQ.services.get('back-end')
        .then(service => Request({
              uri: `http://${service}/api/tweets`,
              json: true
        }))
        .then((data) => {
            return reply.view('tweets',{tweets: data})
        })
        .catch((error) => {
            return reply(Boom.badRequest(error))
        })
};
Handlers.deleteTweetWEB = (req, reply) => {
    return LSQ.services.get('back-end')
        .then((service) => Request({
            uri: `http://${service}/api/tweets/${req.params.id}`,
            method: 'DELETE',
            json: true
        }))
        .then(() => Utils.redirectHomeResponse(reply))
        .catch((error) => {
            return reply(Boom.badRequest(error))
        })
};

Handlers.updateTweetsWEB = (req, reply) => {
    return LSQ.services.get('back-end')
        .then((service) => Request({
            uri: `http://${service}/api/tweets/${req.params.id}`,
            method: 'PUT',
            body: req.payload,
            json: true
        }))
        .then(() => Utils.redirectHomeResponse(reply))
        .catch((error) => {
            return reply(Boom.badRequest(error))
        })
};



Handlers.getOneTweetWEB = (req, reply) => {
    return LSQ.services.get('back-end')
        .then((service) => Request({
            uri: `http://${service}/api/tweets/${req.params.id}`,
            method: 'GET',
            json: true
        }))
        .then((foundTweet) => {
            return reply.view('singletweet',{tweets: foundTweet})

        })
        .catch((error) => {
            return reply(Boom.badRequest(error))
        })
};

Handlers.createTweetsWEB = (req, reply) => {
    return LSQ.services.get('back-end')
        .then((service) => Request({
            uri: `http://${service}/api/tweets`,
            method: 'POST',
            body: req.payload,
            json: true
        }))
        .then(() => Utils.redirectHomeResponse(reply))
        .catch((error) => {
             reply(Boom.badRequest(error.message))
        })
};


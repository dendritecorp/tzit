const fs = require ('fs');
const Handlebars = require('handlebars');
const Boom = require('boom')
const Request = require('request-promise')
const LSQ = require('lsq')

const TWEETS_API = 'http://localhost:3000/api/tweets'

const Handlers = {};
module.exports = Handlers;

Handlers.webIndexPage = (request, reply) => {
  return LSQ.services.get('backend')
    .then((service) => Request({
      uri: `http://${service}/api/tweets`,
      json: true
    }))
    .then((data) => {
      data.map((tweet) => {
        tweet.tweet = decodeURIComponent(tweet.tweet)
        tweet.user = decodeURIComponent(tweet.user)
      });
      reply.view('index', {tweets: data})
    })
    .catch((error) => {
      return reply(Boom.badRequest(error.message))
    })
}

Handlers.webCreateTweet = (request, reply) => {
  return LSQ.services.get('backend')
    .then((service) => Request({
      uri: `http://${service}/api/tweets`,
      body: [request.payload],
      json: true,
      method: 'POST'
      }))
    .then(reply.redirect('/'))
    .catch((error) => {
      return reply(Boom.badRequest(error.message))
    })
}

Handlers.webDeleteTweet = (request, reply) => {
  return LSQ.services.get('backend')
    .then((service) => Request({
      uri: `http://${service}/api/tweets/${request.params.id}`,
      method: 'DELETE'
      }))
    .then(reply.redirect('/'))
    .catch((error) => {
      return reply(Boom.badRequest(error.message))
    })
}

Handlers.webUpdateTweet = (request, reply) => {
  return LSQ.services.get('backend')
    .then((service) => Request({
      uri: `http://${service}/api/tweets/${request.params.id}`,
      method: 'PUT',
      body: {
        tweet: request.payload.text
      },
      json: true
    }))
    .then(reply.redirect('/'))
    .catch((error) => {
      return reply(Boom.badRequest(error.message))
    })
}

Handlers.webViewTweet = (request, reply) => {
  return LSQ.services.get('backend')
    .then((service) => Request({
      uri: `http://${service}/api/tweets/${request.params.id}`,
      method: 'GET',
      json: true
    }))
    .then((foundTweet) => {
      if(!foundTweet) return false
      foundTweet.tweet = decodeURIComponent(foundTweet.tweet)
      foundTweet.user = decodeURIComponent(foundTweet.user)
      return {tweets: foundTweet}
    })
    .then ((tweet) => tweet ? reply.view('tweet', tweet) : reply(Boom.notFound(`Tweet with id ${request.params.id} not found`)))
    .catch((error) => {
      return reply(Boom.badRequest(error.message))
    })
}

Handlers.webSignUp = (request, reply) => {
  reply.view('signup')
}

Handlers.signUp = (request, reply) => {
  return LSQ.services.get('auth')
    .then((service) => Request({
      uri: `http://${service}/signup`,
      body: request.payload,
      json: true,
      method: 'POST'
      }))
    .then(reply)
    .catch((error) => {
      return reply(Boom.badRequest(error.message))
    })
}

Handlers.webLogIn = (request, reply) => {
  reply.view('login')
}

Handlers.logIn = (request, reply) => {
  return LSQ.services.get('auth')
    .then((service) => Request({
      uri: `http://${service}/login`,
      body: request.payload,
      json: true,
      method: 'POST'
      }))
    .then(reply)
    .catch((error) => {
      return reply(Boom.badRequest(error.message))
    })
}

'use strict'
const Hapi = require('hapi')
const Vision = require('vision')
const Inert = require('inert')
const HapiSwagger = require('hapi-swagger')

const Pack = require('./package')

const routes = require('./routes')
const server = new Hapi.Server()

server.connection({
  port: process.env.PORT || 3000,
})

const options = {
  info: {
    title: Pack.name,
    version: Pack.version,
  },
  documentationPath: process.env.NODE_ENV === 'production' ? '/swagger-docs-4tgw5e3t5erfdsrsdfvx' : '/',
}

server.register([
  Vision,
  Inert,
  {
    'register': HapiSwagger,
    'options': options

  }], (err) => {
  if (err) {
    throw err
  }
  server.route(routes)
})

server.start((err) => {
  if (err) throw err
  console.log('Server running at:', server.info.uri)
})

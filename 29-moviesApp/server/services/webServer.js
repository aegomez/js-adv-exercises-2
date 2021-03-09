const express = require('express');
const morgan = require('morgan')
const { ApolloServer } = require('apollo-server-express')

const webServerConfig = require('../config/webServer');
const typeDefs;
const resolvers;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    const server = new ApolloServer({
      typeDefs,
      resolvers
    })

    server.applyMiddleware({app})
    
    app.use(morgan('dev'))
    app.use('/', (req, res) => {
      res.status(200);
      res.send('Hello World!');
      res.end()
    });

    app
      .listen(webServerConfig.port)
      .on('listening', () => {
        console.log(`Listening on port: ${webServerConfig.port}`);
        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

module.exports = { initialize };

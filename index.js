const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const mongoose = require('mongoose')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { word, group } = require('./models')

const app = express()

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
  context: () => {
    return {
      models: {
        word,
        group,
      },
    }
  },
})

server.applyMiddleware({ app, path: '/graphql' });

app.listen(5000, () => {
  mongoose.connect(
    'mongodb://localhost:27017/graphql', 
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  console.log(`Server ready at port 5000`)
})

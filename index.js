const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('./schema')
const resolvers = require('./resolvers')

const app = express()

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
)

mongoose
  .connect(
    "mongodb://localhost/sparkwords", 
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => app.listen(5000, console.log("Server is running")))
  .catch(error => {
    throw error
  })
const express = require('express');
const graphqlHTTP = require('express-graphql');

const { schema, resolvers } = require('./schema/example.js');

var app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(3000, () => console.log('Now browse to localhost:3000/graphql'));
const express = require('express');
const colors = require('colors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const connectDB = require('./config/db');

const app = express();

// Connect to DB
connectDB();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  }),
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sercer running on PORT ${PORT}`));

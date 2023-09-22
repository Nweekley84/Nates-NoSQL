// Importing the Express library
const express = require('express');

// Importing the database connection from './config/connection'
const db = require('./config/connection');

// Importing the routes
const routes = require('./routes');

// Getting the current working directory
const cwd = process.cwd();

// Defining the port number or defaulting to 3001
const PORT = process.env.PORT || 3001;

// Creating an instance of the Express application
const app = express();

// Adding middleware to parse urlencoded and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Using the defined routes
app.use(routes);

// Setting up a listener for the database connection
db.once('open', () => {
  // Starting the Express server
  app.listen(PORT, () => {
    console.log(`Nates No SQL API server running on port ${PORT}!`);
  });
});

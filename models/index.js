// Importing the User and Thought models from their respective files
const User = require('./User');   // Importing the User model
const Thought = require('./Thought'); // Importing the Thought model

// Exporting both User and Thought models as an object
module.exports = { 
  User,     // Exporting the User model
  Thought   // Exporting the Thought model
};

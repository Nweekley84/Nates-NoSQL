// Importing necessary modules from mongoose
const { connect, connection } = require('mongoose');

// Define the MongoDB connection string
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/telepathyDB';

// Establishing the connection to MongoDB
connect(connectionString, {
  useNewUrlParser: true,        // Use the new URL parser
  useUnifiedTopology: true,    // Use the new server discovery and monitoring engine
});

// Exporting the connection object for external use
module.exports = connection;

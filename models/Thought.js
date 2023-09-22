// Importing necessary modules from Mongoose and Moment.js
const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

// Defining the schema for the 'reaction' subdocument
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,  // Data type for the unique identifier of a reaction
    default: function () {       // Default value for a new reaction ID
      return new Types.ObjectId();
    },
  },
  reactionBody: {
    type: String,                // Data type for the content of the reaction
    required: true,              // Reaction content is required
    max_length: 280,             // Maximum length of the reaction content
  },
  username: {
    type: String,                // Data type for the username of the user who created the reaction
    required: true,              // Username is required
  },
  createdAt: {
    type: Date,                  // Data type for the timestamp of when the reaction was created
    default: Date.now,           // Default value is the current timestamp
    get: (timeStamp) => moment(timeStamp).format("MM DD, YYYY [at] hh:mm a"),  // Custom formatting for the timestamp
  },
});

// Defining the schema for the 'thought' model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,                // Data type for the content of the thought
      required: true,              // Thought content is required
      min_length: 1,               // Minimum length of the thought content
      max_length: 280,             // Maximum length of the thought content
    },
    createdAt: {
      type: Date,                  // Data type for the timestamp of when the thought was created
      default: Date.now,           // Default value is the current timestamp
      get: (timeStamp) => moment(timeStamp).format("MM DD, YYYY [at] hh:mm a"),  // Custom formatting for the timestamp
    },
    username: {
      type: String,                // Data type for the username of the user who created the thought
      required: true,              // Username is required
    },
    reactions: [reactionSchema],    // Array of nested 'reaction' subdocuments representing replies to the thought
  },
  {
    toJSON: {
      getters: true,              // Include virtual properties when converting to JSON
    },
  }
);

// Creating a virtual property 'reactionCount' that returns the number of reactions associated with the thought
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Initializing the Thought model based on the defined schema
const Thought = model("thought", thoughtSchema);

// Exporting the Thought model for use in other files
module.exports = Thought;

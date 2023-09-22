// Importing necessary modules from Mongoose
const { Schema, model } = require("mongoose");

// Defining the schema for the 'user' model
const userSchema = new Schema(
  {
    username: {
      type: String,              // Data type for the username
      unique: true,              // Username must be unique
      required: true,            // Username is required
      trim: true,                // Remove extra whitespaces from the username
    },
    email: {
      type: String,              // Data type for the email address
      unique: true,              // Email must be unique
      required: true,            // Email is required
      match: [                   // Pattern match for a valid email address
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address!",
      ],
    },
    thoughts: [{                 // Array of _id values referencing the Thought model
      type: Schema.Types.ObjectId,
      ref: "thought",
    }],
    friends: [{                  // Array of _id values referencing the User model (self-reference for friends)
      type: Schema.Types.ObjectId,
      ref: "user",
    }],
  },
  {
    toJSON: {
      virtuals: true,           // Include virtual properties when converting to JSON
    },
  }
);

// Creating a virtual property 'friendCount' that returns the number of friends associated with the user
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Initializing the User model based on the defined schema
const User = model("user", userSchema);

// Exporting the User model for use in other files
module.exports = User;

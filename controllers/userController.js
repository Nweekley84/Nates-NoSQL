const { User, Thought } = require("../models");

// Aggregate function to get the number of Users overall
const allUsers = async () =>
  User.aggregate()
    .count("userCount")
    .then((numberOfUsers) => numberOfUsers);

// Handles userRoutes
module.exports = {
  // Get all Users
  getUsers(req, res) {
    User.find()
      .populate("thoughts") // Populates the 'thoughts' field for each user
      .then(async (users) => {
        const userObj = {
          users, // Creates an object with the 'users' array
        };
        return res.json(userObj); // Responds with the user object as JSON
      })
      .catch((err) => {
        console.log(err); // Logs any errors
        return res.status(500).json(err); // Responds with a 500 status and the error as JSON
      });
  },

  // Get a single User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId }) // Finds a user by their unique ID
      .select("-__v") // Excludes the '__v' field from the response
      .then(async (user) =>
        !user
          ? res
              .status(404)
              .json({ message: "User not found! Please try again." }) // Responds with a 404 status and an error message if user is not found
          : res.json({
              user, // Responds with the user information
              allUsers: await allUsers(), // Calls the 'allUsers' function and includes the result
            })
      )
      .catch((err) => {
        console.log(err); // Logs any errors
        return res.status(500).json(err); // Responds with a 500 status and the error as JSON
      });
  },

  // create a new User
  createUser(req, res) {
    User.create(req.body) // Creates a new user with the provided request body
      .then((user) => res.json(user)) // Responds with the created user as JSON
      .catch((err) => res.status(500).json(err)); // Responds with a 500 status and the error as JSON in case of an error
  },

  // Update user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId }, // Finds a user by their unique ID
      { $set: req.body }, // Updates the user with the provided request body
      { new: true } // Returns the updated user
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "User not found! Please try again." }) // Responds with a 404 status and an error message if user is not found
          : res.json({ user: "User successfully updated! 🎉" }) // Responds with a success message
      )
      .catch((err) => {
        console.log(err); // Logs any errors
        res.status(500).json(err); // Responds with a 500 status and the error as JSON
      });
  },

  // Delete user by id (cascade thoughts)
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId }) // Finds and removes a user by their unique ID
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "User not found! Please try again." }) // Responds with a 404 status and an error message if user is not found
          : Thought.deleteMany({ _id: { $in: user.thoughts } }) // Deletes thoughts associated with the user
      )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "User deleted! No thoughts 💭 to delete." }) // Responds with a message if no thoughts were found to delete
          : res.json({
              message: "User and their thoughts successfully deleted! 🧠🎉", // Responds with a success message
            })
      )
      .catch((err) => {
        console.log(err); // Logs any errors
        res.status(500).json(err); // Responds with a 500 status and the error as JSON
      });
  },

  // Add friend by userId
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId }, // Finds a user by their unique ID
      { $addToSet: { friends: [req.params.friendId] } }, // Adds a friend to the user's list of friends
      { runValidators: true, new: true } // Ensures validators are run and returns the updated user
    )
      .then((friend) =>
        !friend
          ? res.status(404).json({
              message: "No friend with that ID found! Please try again.", // Responds with a 404 status and an error message if friend is not found
            })
          : res.json(friend) // Responds with the updated user including the added friend
      )
      .catch((err) => res.status(500).json(err)); // Responds with a 500 status and the error as JSON in case of an error
  },

  // Delete friend by userId
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId }, // Finds a user by their unique ID
      { $pull: { friends: [req.params.friendId] } }, // Removes a friend from the user's list of friends
      { runValidators: true, new: true } // Ensures validators are run and returns the updated user
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "User not found! Please try again." }) // Responds with a 404 status and an error message if user is not found
          : res.json({ user: "Friend successfully removed 🎉" }) // Responds with a success message
      )
      .catch((err) => {
        console.log(err); // Logs any errors
        res.status(500).json(err); // Responds with a 500 status and the error as JSON
      });
  },
};

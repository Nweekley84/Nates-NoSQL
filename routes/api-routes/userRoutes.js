// Importing the Express router
const router = require('express').Router();

// Importing specific functions from the userController
const {
  getUsers,          // Function to get all users
  getSingleUser,     // Function to get a single user by ID
  createUser,        // Function to create a new user
  updateUser,        // Function to update a user by ID
  deleteUser,        // Function to delete a user by ID
  addFriend,         // Function to add a friend to a user's friend list
  removeFriend       // Function to remove a friend from a user's friend list
} = require('../../controllers/userController');

// Routes and corresponding controller functions
// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

// Exporting the configured router
module.exports = router;

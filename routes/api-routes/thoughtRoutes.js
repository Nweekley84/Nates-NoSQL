// Importing the Express router
const router = require('express').Router();

// Importing specific functions from the thoughtController
const {
  getThoughts,         // Function to get all thoughts
  getSingleThought,    // Function to get a single thought by ID
  createThought,       // Function to create a new thought
  updateThought,       // Function to update a thought by ID
  deleteThought,       // Function to delete a thought by ID
  addReaction,         // Function to add a reaction to a thought
  removeReaction,      // Function to remove a reaction from a thought
} = require('../../controllers/thoughtController');

// Routes and corresponding controller functions
// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

// Exporting the configured router
module.exports = router;

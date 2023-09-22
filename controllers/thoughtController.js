// Importing necessary models
const { User, Thought } = require("../models");

// Handles thoughtRoutes
module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v") // Excluding '__v' field from the response
      .then(async (thoughts) =>
        !thoughts
          ? res
              .status(404)
              .json({ message: "Thought not found! Please try again." })
          : res.json({
              thoughts,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Create a new Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Error: thought was not recorded!" })
          : User.findOneAndUpdate(
              { userId: req.body.userId },
              { $push: { thought: { thought: thought.thoughtText } } }, // Adding thought to user's thoughts array
              { runValidators: true, new: true } // Running validators and returning the updated document
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "User not found! Please try again." })
          : res.json({ thought: "Thought successfully created! 💭🎉" })
      )
      .then((thought) => res.json(thought)) // Responding with the created thought
      .catch((err) => res.status(500).json(err)); // Handling errors
  },

  // Update Thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { thoughtId: req.params.thoughtId },
      { thoughtText: req.body.thoughtText, username: req.body.username }, // Updating thoughtText and username
      { runValidators: true, new: true } // Running validators and returning the updated document
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Thought not found! Please try again." })
          : res.json({ thought: "Thought successfully updated! 💭🎉" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete Thought by id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ thoughtId: req.params.thoughtId })
      .then(() => res.json({ message: "thought deleted" })) // Responding with a success message
      .catch((err) => res.status(500).json(err)); // Handling errors
  },

  // Add reaction by thoughtId
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { thoughtId: req.params.thoughtId },
      { $addToSet: { reactions: [req.body] } }, // Adding a reaction to the reactions array
      { runValidators: true, new: true } // Running validators and returning the updated document
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "No thought with that ID found! Please try again.",
            })
          : res.json({ thought: "Reaction successfully added! 🎉" })
      )
      .catch((err) => res.status(500).json(err)); // Handling errors
  },

  // Delete reaction by thoughtId
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { thoughtId: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } }, // Removing a reaction from the reactions array
      { runValidators: true, new: true } // Running validators and returning the updated document
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Thought not found! Please try again." })
          : res.json({ thought: "Reaction successfully removed! 🎉" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

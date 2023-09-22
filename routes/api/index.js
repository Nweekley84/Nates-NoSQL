// const router = require('express').Router();

// const userRoutes = require('./user-routes');
// const thoughtRoutes = require('./thought-routes');

// router.use('/user',userRoutes);
// router.use('/thought',thoughtRoutes);
// module.exports = router;

// Importing the Express router
const router = require("express").Router();

// Importing the routes for thoughts and users
const thoughtRoutes = require("./thoughtRoutes");  // Importing routes related to thoughts
const userRoutes = require("./userRoutes");        // Importing routes related to users

// Using the routes for thoughts and users under their respective endpoints
router.use("/thoughts", thoughtRoutes);  // Mounting thoughtRoutes under the "/thoughts" endpoint
router.use("/users", userRoutes);        // Mounting userRoutes under the "/users" endpoint

// Exporting the configured router
module.exports = router;

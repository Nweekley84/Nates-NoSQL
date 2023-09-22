// Importing the Express router
const router = require("express").Router();

// Importing the API routes
const apiRoutes = require("./api");  

// Mounting the API routes under the "/api" endpoint
router.use("/api", apiRoutes);

// Catch-all route for incorrect routes, sending an error message
router.use((req, res) => res.send("Oops! Wrong route."));

// Exporting the configured router
module.exports = router;

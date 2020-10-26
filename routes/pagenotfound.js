const express = require('express');
const router = express.Router();

// handling undefined routes
router.use((req, res, next) => {
    res.status(404).send("<h1> Page not found! </h1>");
});

module.exports = router;
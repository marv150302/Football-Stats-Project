const express = require('express');
const APPEARANCE_ROUTER = express.Router();
const APPEARANCE_CONTROLLER = require('../controllers/appearances');

// Route to retrieve all data from the "Appearances" collection
APPEARANCE_ROUTER.get('/appearances', APPEARANCE_CONTROLLER.getAllAppearances);

module.exports = APPEARANCE_ROUTER;

const express = require('express');
const router = express.Router();
const GAME_EVENT_CONTROLLER = require('../controllers/game_event');

// Route to retrieve all game events
router.get('/game-events', GAME_EVENT_CONTROLLER.getAllGameEvents);

module.exports = router;

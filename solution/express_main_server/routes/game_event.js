const express = require('express');
const router = express.Router();
const GAME_EVENT_CONTROLLER = require('../controllers/game_event');

// Route to retrieve all game events
router.get('/get-all-game-events', GAME_EVENT_CONTROLLER.getAllGameEvents);
//route to retrieve all game events by the id of the gaeme
router.get('/get-all-game-events-by-game-id', GAME_EVENT_CONTROLLER.getAllGameEventsById);

module.exports = router;

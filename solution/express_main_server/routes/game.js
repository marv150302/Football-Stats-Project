const express = require('express');
const router = express.Router();
const GAME_CONTROLLER = require('../controllers/game');

/**
 * route to retrieve all games
 */
router.get('/games', GAME_CONTROLLER.getAllGames);

module.exports = router;

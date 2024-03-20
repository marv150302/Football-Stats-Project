const express = require('express');
const router = express.Router();
const GAMES_LINEUP_CONTROLLER = require('../controllers/game_lineup');

router.get('/get-all-games-lineup',GAMES_LINEUP_CONTROLLER.getAllGamesLineup);
module.exports = router;
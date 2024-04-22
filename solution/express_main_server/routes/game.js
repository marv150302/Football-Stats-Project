const express = require('express');
const router = express.Router();
const GAME_CONTROLLER = require('../controllers/game');

/**
 * route to retrieve all games
 */
router.get('/games', GAME_CONTROLLER.getAllGames);
router.get('/get-latest-game-by-competition',  GAME_CONTROLLER.getLatestGameByCompetition);
router.get('/get-last-four-games-by-competition-and-year', GAME_CONTROLLER.getLastFourGamesByCompetitionAndYear);
router.get('/get-all-games-by-competition-and-year', GAME_CONTROLLER.getAllGamesByCompetitionAndYear);
router.get('/get-game-info', GAME_CONTROLLER.getGameInfo);


module.exports = router;

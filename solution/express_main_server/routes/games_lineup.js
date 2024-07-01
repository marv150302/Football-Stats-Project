const express = require('express');
const router = express.Router();
const GAMES_LINEUP_CONTROLLER = require('../controllers/game_lineup');

//route to get all the games lineups
router.get('/get-all-games-lineup',GAMES_LINEUP_CONTROLLER.getAllGamesLineup);
//route to get a game's lineups by the ID of the game
router.get('/get-game-lineup-by-id',GAMES_LINEUP_CONTROLLER.getGameLineupById);
//route to get the player's club history
router.get('/get-player-club-history',GAMES_LINEUP_CONTROLLER.getPlayerClubAppearanceHistory);
module.exports = router;
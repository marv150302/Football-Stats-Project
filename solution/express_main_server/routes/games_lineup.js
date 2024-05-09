const express = require('express');
const router = express.Router();
const GAMES_LINEUP_CONTROLLER = require('../controllers/game_lineup');

router.get('/get-all-games-lineup',GAMES_LINEUP_CONTROLLER.getAllGamesLineup);
router.get('/get-game-lineup-by-id',GAMES_LINEUP_CONTROLLER.getGameLineupById);
router.get('/get-player-club-history',GAMES_LINEUP_CONTROLLER.getPlayerClubAppearanceHistory);
module.exports = router;
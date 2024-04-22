const express = require('express');
const router = express.Router();
const CLUB_GAMES_CONTROLLER = require('../controllers/club_games');


router.get('/get-all-club-games', CLUB_GAMES_CONTROLLER.getAllClubGames);
router.get('/get-club-game-by-game-id-and-club-id', CLUB_GAMES_CONTROLLER.getClubGameByGameIdAndClubId);



module.exports = router;

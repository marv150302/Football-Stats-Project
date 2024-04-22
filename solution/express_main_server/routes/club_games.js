const express = require('express');
const router = express.Router();
const CLUB_GAMES = require('../models/club_games');
const CLUB_GAMES_CONTROLLER = require('../controllers/club_games');


router.get('/get-all-club-games', CLUB_GAMES_CONTROLLER.getAllClubGames);
router.get('/get-club-game-by-game-id-and-club-id', CLUB_GAMES_CONTROLLER.getClubGameByGameIdAndClubId);
router.get('/get-standings-up-to-round', CLUB_GAMES_CONTROLLER.getClubStandingData)



module.exports = router;

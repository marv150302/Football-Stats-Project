const express = require('express');
const router = express.Router();
const CLUB_GAMES_CONTROLLER = require('../controllers/club_games');

//route to get all the games by a club
router.get('/get-all-club-games', CLUB_GAMES_CONTROLLER.getAllClubGames);
//route to get a specific club game by the ID of the club and the ID of the game
router.get('/get-club-game-by-game-id-and-club-id', CLUB_GAMES_CONTROLLER.getClubGameByGameIdAndClubId);



module.exports = router;

const express = require('express');
const router = express.Router();
const GAME_CONTROLLER = require('../controllers/game');

//route to get all games
router.get('/get-all-games', GAME_CONTROLLER.getAllGames);
//route to get the latest game by the competition id
router.get('/get-latest-game-by-competition',  GAME_CONTROLLER.getLatestGameByCompetition);
//route to get the last four games by the competition id and the season(year)
router.get('/get-last-four-games-by-competition-and-year', GAME_CONTROLLER.getLastFourGamesByCompetitionAndYear);
//route to get the last  game by the competition id and the season(year)
router.get('/get-all-games-by-competition-and-year', GAME_CONTROLLER.getAllGamesByCompetitionAndYear);
//route to get a game's information by its id
router.get('/get-game-info', GAME_CONTROLLER.getGameInfo);
//route to get the league standings up to a matchday/round
router.get('/get-standings-up-to-round', GAME_CONTROLLER.calculateClubStats);
//route to get all head-to-head games between two teams
router.get('/get-head-2-head-games', GAME_CONTROLLER.getHead2Head);
//route to get the last game by the club's id
router.get('/get-club-last-game', GAME_CONTROLLER.getClubLastGame);

module.exports = router;

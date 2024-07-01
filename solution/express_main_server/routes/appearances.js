const express = require('express');
const APPEARANCE_ROUTER = express.Router();
const APPEARANCE_CONTROLLER = require('../controllers/appearances');

//route to get all appearances
APPEARANCE_ROUTER.get('/get-all-appearances', APPEARANCE_CONTROLLER.getAllAppearances);
//route to get the id of the player who scored the most goals
APPEARANCE_ROUTER.get('/top-scorer-id', APPEARANCE_CONTROLLER.getTopScorer);
//route to get the id of the player who scored the most goals by the competition and the season(year)
APPEARANCE_ROUTER.get('/get-top-scorer-by-competition-and-year', APPEARANCE_CONTROLLER.getTopScorersByCompetitionAndYear);
//route to get all the appearances by the game id
APPEARANCE_ROUTER.get('/get-appearances-by-game-id', APPEARANCE_CONTROLLER.getAllAppearancesByGameId);
//route to get the basic stats about a player by its id and the season
APPEARANCE_ROUTER.get('/get-player-basic-data-by-id-and-season', APPEARANCE_CONTROLLER.getTotalGoalsAndAssistsForPlayerAndSeason);
//APPEARANCE_ROUTER.get('/get-player-club-history', APPEARANCE_CONTROLLER.getPlayerClubHistory);

module.exports = APPEARANCE_ROUTER;

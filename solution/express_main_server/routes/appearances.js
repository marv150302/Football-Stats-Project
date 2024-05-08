const express = require('express');
const APPEARANCE_ROUTER = express.Router();
const APPEARANCE_CONTROLLER = require('../controllers/appearances');
const COMPETITION_CONTROLLER = require("../controllers/competition");

// Route to retrieve all data from the "Appearances" collection
APPEARANCE_ROUTER.get('/appearances', APPEARANCE_CONTROLLER.getAllAppearances);
APPEARANCE_ROUTER.get('/top-scorer-id', APPEARANCE_CONTROLLER.getTopScorer);
APPEARANCE_ROUTER.get('/get-top-scorer-by-competition-and-year', APPEARANCE_CONTROLLER.getTopScorersByCompetitionAndYear);
APPEARANCE_ROUTER.get('/get-appearances-by-game-id', APPEARANCE_CONTROLLER.getAllAppearancesByGameId);
APPEARANCE_ROUTER.get('/get-player-basic-data-by-id-and-season', APPEARANCE_CONTROLLER.getTotalGoalsAndAssistsForPlayerAndSeason);

module.exports = APPEARANCE_ROUTER;

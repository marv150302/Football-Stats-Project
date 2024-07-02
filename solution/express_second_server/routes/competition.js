const express = require('express');
const router = express.Router();
const COMPETITION_CONTROLLER = require('../controllers/competition');

//route to get all competitions
router.get('/get-all-competitions',COMPETITION_CONTROLLER.getAllCompetitions);
//route to get a competition information by its ID
router.get('/get-competition-by-id', COMPETITION_CONTROLLER.getCompetitionById);
module.exports = router;
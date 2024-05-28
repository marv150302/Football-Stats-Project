const express = require('express');
const router = express.Router();
const COMPETITION_CONTROLLER = require('../controllers/competition');

router.get('/get-all-competitions',COMPETITION_CONTROLLER.getAllCompetitions);
router.get('/get-competition-by-id', COMPETITION_CONTROLLER.getCompetitionById);
module.exports = router;
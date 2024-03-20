const express = require('express');
const router = express.Router();
const COMPETITION_CONTROLLER = require('../controllers/competition');

router.get('/get-all-competitions',COMPETITION_CONTROLLER.getAllCompetitions);
module.exports = router;
const express = require('express');
const router = express.Router();
const PLAYER_VALUATION_CONTROLLER = require('../controllers/player_valuation');

router.get('/get-all-players-valuation',PLAYER_VALUATION_CONTROLLER.getAllPlayersValuation);
module.exports = router;
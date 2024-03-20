const express = require('express');
const router = express.Router();
const PLAYER_CONTROLLER = require('../controllers/player');

router.get('/get-all-players',PLAYER_CONTROLLER.getAllPlayers);
module.exports = router;
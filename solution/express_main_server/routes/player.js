const express = require('express');
const router = express.Router();
const PLAYER_CONTROLLER = require('../controllers/player');

router.get('/get-all-players',PLAYER_CONTROLLER.getAllPlayers);
router.get('/get-player-data-by-id', PLAYER_CONTROLLER.getPlayerDataById);
router.get('/get-player-by-name', PLAYER_CONTROLLER.getPlayerByName);
module.exports = router;
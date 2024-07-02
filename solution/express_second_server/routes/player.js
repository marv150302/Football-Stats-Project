const express = require('express');
const router = express.Router();
const PLAYER_CONTROLLER = require('../controllers/player');

//route to get all the players
router.get('/get-all-players',PLAYER_CONTROLLER.getAllPlayers);
//route to get a player's data by its id
router.get('/get-player-data-by-id', PLAYER_CONTROLLER.getPlayerDataById);
//route to get a list of players by a name
router.get('/get-player-by-name', PLAYER_CONTROLLER.getPlayerByName);
module.exports = router;
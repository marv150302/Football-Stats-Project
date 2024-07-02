const express = require('express');
const router = express.Router();
const CLUB_CONTROLLER = require('../controllers/club');

//route to get all clubs
router.get('/get-all-clubs',CLUB_CONTROLLER.getAllClubs);
//route to get a club info by its id
router.get('/get-club-data-by-id',CLUB_CONTROLLER.getClubDataById);
//route to get all the players belonging to a club
router.get('/get-club-players', CLUB_CONTROLLER.getClubPlayers);
module.exports = router;
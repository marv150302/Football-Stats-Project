const express = require('express');
const router = express.Router();
const CLUB_CONTROLLER = require('../controllers/club');

router.get('/get-all-clubs',CLUB_CONTROLLER.getAllClubs);
router.get('/get-club-data-by-id',CLUB_CONTROLLER.getClubDataById);
router.get('/get-club-players', CLUB_CONTROLLER.getClubPlayers);
module.exports = router;
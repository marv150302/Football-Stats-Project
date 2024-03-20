const express = require('express');
const router = express.Router();
const CLUB_CONTROLLER = require('../controllers/club');

router.get('/get-all-clubs',CLUB_CONTROLLER.getAllClubs);
module.exports = router;
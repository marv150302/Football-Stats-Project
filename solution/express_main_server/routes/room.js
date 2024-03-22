const express = require('express');
const router = express.Router();
const ROOM_CONTROLLER = require('../controllers/room');

router.get('/get-all-rooms',ROOM_CONTROLLER.getRoomList);
module.exports = router;
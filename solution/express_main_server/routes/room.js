const express = require('express');
const router = express.Router();
const ROOM_CONTROLLER = require('../controllers/room');

/**
 * route to get the list of rooms for the chat
 * note --> this was not used, but rather replaced by a more effective implementation
 */
router.get('/get-all-rooms',ROOM_CONTROLLER.getRoomList);
module.exports = router;
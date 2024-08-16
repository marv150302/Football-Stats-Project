const express = require('express');
const router = express.Router();
const GAME_EVENT_CONTROLLER = require('../controllers/game_event');

/**
 * @swagger
 * /api/get-all-game-events:
 *   get:
 *     summary: Retrieve all game events
 *     responses:
 *       200:
 *         description: A list of game events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get-all-game-events', GAME_EVENT_CONTROLLER.getAllGameEvents);

/**
 * @swagger
 * /api/get-all-game-events-by-game-id:
 *   get:
 *     summary: Retrieve all game events by the ID of the game
 *     parameters:
 *       - name: game_id
 *         in: query
 *         required: true
 *         description: The ID of the game
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of game events by game ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get-all-game-events-by-game-id', GAME_EVENT_CONTROLLER.getAllGameEventsById);

module.exports = router;

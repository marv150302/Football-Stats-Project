const express = require('express');
const router = express.Router();
const PLAYER_CONTROLLER = require('../controllers/player');

/**
 * @swagger
 * /api/players/get-all-players:
 *   get:
 *     summary: Retrieve a list of all players
 *     responses:
 *       200:
 *         description: A list of players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get-all-players', PLAYER_CONTROLLER.getAllPlayers);

/**
 * @swagger
 * /api/players/get-player-data-by-id:
 *   get:
 *     summary: Retrieve a player's data by its ID
 *     parameters:
 *       - name: playerId
 *         in: query
 *         required: true
 *         description: The ID of the player
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Player data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 playerId:
 *                   type: integer
 *                   description: The ID of the player
 *                 name:
 *                   type: string
 *                   description: The name of the player
 */
router.get('/get-player-data-by-id', PLAYER_CONTROLLER.getPlayerDataById);

/**
 * @swagger
 * /api/players/get-player-by-name:
 *   get:
 *     summary: Retrieve a list of players by name
 *     parameters:
 *       - name: name
 *         in: query
 *         required: true
 *         description: The name of the player
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of players matching the name
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get-player-by-name', PLAYER_CONTROLLER.getPlayerByName);

module.exports = router;

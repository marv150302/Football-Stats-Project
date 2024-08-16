const express = require('express');
const router = express.Router();
const GAMES_LINEUP_CONTROLLER = require('../controllers/game_lineup');

/**
 * @swagger
 * /api/get-all-games-lineup:
 *   get:
 *     summary: Retrieve all games lineups
 *     responses:
 *       200:
 *         description: A list of games lineups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get-all-games-lineup', GAMES_LINEUP_CONTROLLER.getAllGamesLineup);

/**
 * @swagger
 * /api/get-game-lineup-by-id:
 *   get:
 *     summary: Retrieve a game's lineup by the ID of the game
 *     parameters:
 *       - name: game_id
 *         in: query
 *         required: true
 *         description: The ID of the game
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The game's lineup
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 game_id:
 *                   type: integer
 *                   description: The ID of the game
 */
router.get('/get-game-lineup-by-id', GAMES_LINEUP_CONTROLLER.getGameLineupById);

/**
 * @swagger
 * /api/get-player-club-history:
 *   get:
 *     summary: Retrieve the player's club history
 *     parameters:
 *       - name: player_id
 *         in: query
 *         required: true
 *         description: The ID of the player
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The player's club history
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get-player-club-history', GAMES_LINEUP_CONTROLLER.getPlayerClubAppearanceHistory);

module.exports = router;

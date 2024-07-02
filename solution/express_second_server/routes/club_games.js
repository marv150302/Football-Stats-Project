const express = require('express');
const router = express.Router();
const CLUB_GAMES_CONTROLLER = require('../controllers/club_games');

/**
 * @swagger
 * /api/club-games/get-all-club-games:
 *   get:
 *     summary: Retrieve a list of all games by a club
 *     responses:
 *       200:
 *         description: A list of club games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get-all-club-games', CLUB_GAMES_CONTROLLER.getAllClubGames);

/**
 * @swagger
 * /api/club-games/get-club-game-by-game-id-and-club-id:
 *   get:
 *     summary: Retrieve a specific club game by the ID of the club and the ID of the game
 *     parameters:
 *       - name: game_id
 *         in: query
 *         required: true
 *         description: The ID of the game
 *         schema:
 *           type: integer
 *       - name: club_id
 *         in: query
 *         required: true
 *         description: The ID of the club
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A specific club game
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 game_id:
 *                   type: integer
 *                   description: The ID of the game
 *                 club_id:
 *                   type: integer
 *                   description: The ID of the club
 *
 */
router.get('/get-club-game-by-game-id-and-club-id', CLUB_GAMES_CONTROLLER.getClubGameByGameIdAndClubId);

module.exports = router;

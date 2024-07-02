const express = require('express');
const router = express.Router();
const GAME_CONTROLLER = require('../controllers/game');

/**
 * @swagger
 * /api/games/get-all-games:
 *   get:
 *     summary: Retrieve a list of all games
 *     responses:
 *       200:
 *         description: A list of games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get-all-games', GAME_CONTROLLER.getAllGames);

/**
 * @swagger
 * /api/games/get-latest-game-by-competition:
 *   get:
 *     summary: Retrieve the latest game by the competition id
 *     parameters:
 *       - name: competition_id
 *         in: query
 *         required: true
 *         description: The ID of the competition
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The latest game by competition id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 game_id:
 *                   type: integer
 *                   description: The ID of the game
 *                 competition_id:
 *                   type: integer
 *                   description: The ID of the competition
 */
router.get('/get-latest-game-by-competition', GAME_CONTROLLER.getLatestGameByCompetition);

/**
 * @swagger
 * /api/games/get-last-four-games-by-competition-and-year:
 *   get:
 *     summary: Retrieve the last four games by the competition id and the season (year)
 *     parameters:
 *       - name: competition_id
 *         in: query
 *         required: true
 *         description: The ID of the competition
 *         schema:
 *           type: integer
 *       - name: year
 *         in: query
 *         required: true
 *         description: The year of the season
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The last four games by competition and year
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get-last-four-games-by-competition-and-year', GAME_CONTROLLER.getLastFourGamesByCompetitionAndYear);

/**
 * @swagger
 * /api/games/get-all-games-by-competition-and-year:
 *   get:
 *     summary: Retrieve all games by the competition id and the season (year)
 *     parameters:
 *       - name: competition_id
 *         in: query
 *         required: true
 *         description: The ID of the competition
 *         schema:
 *           type: integer
 *       - name: season
 *         in: query
 *         required: true
 *         description: The season year
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: All games by competition and year
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get-all-games-by-competition-and-year', GAME_CONTROLLER.getAllGamesByCompetitionAndYear);

/**
 * @swagger
 * /api/games/get-game-info:
 *   get:
 *     summary: Retrieve a game's information by its id
 *     parameters:
 *       - name: game_id
 *         in: query
 *         required: true
 *         description: The ID of the game
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Game information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 game_id:
 *                   type: integer
 *                   description: The ID of the game
 */
router.get('/get-game-info', GAME_CONTROLLER.getGameInfo);

/**
 * @swagger
 * /api/games/get-standings-up-to-round:
 *   get:
 *     summary: Retrieve the league standings up to a matchday/round
 *     parameters:
 *       - name: date
 *         in: query
 *         required: false
 *         description: The date up to which to calculate standings
 *         schema:
 *           type: string
 *           format: date
 *       - name: competition_id
 *         in: query
 *         required: true
 *         description: The ID of the competition
 *         schema:
 *           type: integer
 *       - name: season
 *         in: query
 *         required: true
 *         description: The season year
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: League standings up to a matchday/round
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get-standings-up-to-round', GAME_CONTROLLER.calculateClubStats);

/**
 * @swagger
 * /api/games/get-head-2-head-games:
 *   get:
 *     summary: Retrieve all head-to-head games between two teams
 *     parameters:
 *       - name: home_club_id
 *         in: query
 *         required: true
 *         description: The ID of the home club
 *         schema:
 *           type: integer
 *       - name: away_club_id
 *         in: query
 *         required: true
 *         description: The ID of the away club
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of head-to-head games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get-head-2-head-games', GAME_CONTROLLER.getHead2Head);

/**
 * @swagger
 * /api/games/get-club-last-game:
 *   get:
 *     summary: Retrieve the last game by the club's id
 *     parameters:
 *       - name: club_id
 *         in: query
 *         required: true
 *         description: The ID of the club
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The last game by the club's id
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
 */
router.get('/get-club-last-game', GAME_CONTROLLER.getClubLastGame);

module.exports = router;

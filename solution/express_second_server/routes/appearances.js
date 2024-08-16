const express = require('express');
const APPEARANCE_CONTROLLER = require('../controllers/appearances');
const router = express.Router();

/**
 * @swagger
 * /api/get-all-appearances:
 *   get:
 *     summary: Retrieve a list of all appearances
 *     responses:
 *       200:
 *         description: A list of appearances
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get-all-appearances', APPEARANCE_CONTROLLER.getAllAppearances);

/**
 * @swagger
 * /api/top-scorer-id:
 *   get:
 *     summary: Retrieve the ID of the player who scored the most goals
 *     responses:
 *       200:
 *         description: The ID of the top scorer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 player_id:
 *                   type: integer
 *                   description: The ID of the top scorer
 */
router.get('/top-scorer-id', APPEARANCE_CONTROLLER.getTopScorer);

/**
 * @swagger
 * /api/get-top-scorer-by-competition-and-year:
 *   get:
 *     summary: Retrieve the ID of the player who scored the most goals by competition and year
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
 *         description: The ID of the top scorer by competition and year
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 player_id:
 *                   type: integer
 *                   description: The ID of the top scorer
 */
router.get('/get-top-scorer-by-competition-and-year', APPEARANCE_CONTROLLER.getTopScorersByCompetitionAndYear);

/**
 * @swagger
 * /api/get-appearances-by-game-id:
 *   get:
 *     summary: Retrieve all appearances by game ID
 *     parameters:
 *       - name: game_id
 *         in: query
 *         required: true
 *         description: The ID of the game
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of appearances by game ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get-appearances-by-game-id', APPEARANCE_CONTROLLER.getAllAppearancesByGameId);

/**
 * @swagger
 * /api/get-player-basic-data-by-id-and-season:
 *   get:
 *     summary: Retrieve the basic stats about a player by ID and season
 *     parameters:
 *       - name: player_id
 *         in: query
 *         required: true
 *         description: The ID of the player
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
 *         description: The basic stats about the player
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalGoals:
 *                   type: integer
 *                   description: The total number of goals
 *                 totalAssists:
 *                   type: integer
 *                   description: The total number of assists
 *                 totalAppearances:
 *                   type: integer
 *                   description: The total number of appearances
 */
router.get('/get-player-basic-data-by-id-and-season', APPEARANCE_CONTROLLER.getTotalGoalsAndAssistsForPlayerAndSeason);

module.exports = router;

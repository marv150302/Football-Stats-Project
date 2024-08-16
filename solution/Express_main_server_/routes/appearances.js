const express = require('express');
const axios = require('axios');
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
router.get('/get-all-appearances', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:3001/api/get-all-appearances');
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error trying to get appearances');
    }
});

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
router.get('/top-scorer-id', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:3001/api/top-scorer-id');
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error trying to get the top scorer ID');
    }
});

/**
 * @swagger
 * /api/get-top-scorer-by-competition-and-year:
 *   get:
 *     summary: Retrieve the ID of the player who scored the most goals by the competition and the season (year)
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
router.get('/get-top-scorer-by-competition-and-year', async function (req, res) {
    try {
        const competition_id = req.query.competition_id;
        const year = parseInt(req.query.year, 10);
        const response = await axios.get(`http://localhost:3001/api/get-top-scorer-by-competition-and-year?competition_id=${competition_id}&year=${year}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error trying to get the top scorer by competition and year');
    }
});

/**
 * @swagger
 * /api/get-appearances-by-game-id:
 *   get:
 *     summary: Retrieve all appearances by the game ID
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
router.get('/get-appearances-by-game-id', async function (req, res) {
    try {
        const game_id = req.query.game_id;
        const response = await axios.get(`http://localhost:3001/api/get-appearances-by-game-id?game_id=${game_id}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error trying to get appearances by game ID');
    }
});

/**
 * @swagger
 * /api/get-player-basic-data-by-id-and-season:
 *   get:
 *     summary: Retrieve the basic stats about a player by its ID and the season
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
 *                 player_id:
 *                   type: integer
 *                   description: The ID of the player
 *                 season:
 *                   type: integer
 *                   description: The season year
 */
router.get('/get-player-basic-data-by-id-and-season', async function (req, res) {
    try {
        const player_id = parseInt(req.query.player_id, 10);
        const season = parseInt(req.query.season, 10);
        const response = await axios.get(`http://localhost:3001/api/get-player-basic-data-by-id-and-season?player_id=${player_id}&season=${season}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error trying to get player basic data by ID and season');
    }
});

module.exports = router;

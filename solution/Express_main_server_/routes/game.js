const express = require('express');
const axios = require('axios');
const router = express.Router();

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
router.get('/get-all-games', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:3001/api/get-all-games');
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error trying to get all games');
    }
});

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
router.get('/get-latest-game-by-competition', async function (req, res) {
    try {
        const competition_id = req.query.competition_id;
        const response = await axios.get(`http://localhost:3001/api/get-latest-game-by-competition?competition_id=${competition_id}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error trying to get the latest game by competition');
    }
});

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
router.get('/get-last-four-games-by-competition-and-year', async function (req, res) {
    try {
        const competition_id = req.query.competition_id;
        const year = parseInt(req.query.year, 10);
        const response = await axios.get(`http://localhost:3001/api/get-last-four-games-by-competition-and-year?competition_id=${competition_id}&year=${year}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error trying to get the last four games by competition and year');
    }
});

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
router.get('/get-all-games-by-competition-and-year', async function (req, res) {
    try {
        const competition_id = req.query.competition_id;
        const season = parseInt(req.query.season, 10);
        const response = await axios.get(`http://localhost:3001/api/get-all-games-by-competition-and-year?competition_id=${competition_id}&season=${season}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error trying to get all games by competition and year');
    }
});

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
router.get('/get-game-info', async function (req, res) {
    try {
        const game_id = req.query.game_id;
        const response = await axios.get(`http://localhost:3001/api/get-game-info?game_id=${game_id}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error trying to get game information');
    }
});

/**
 * @swagger
 * /api/games/get-standings-up-to-round:
 *   get:
 *     summary: Retrieve the league standings up to a matchday/round
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
 *         description: League standings up to a matchday/round
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get-standings-up-to-round', async function (req, res) {
    try {
        const competition_id = req.query.competition_id;
        const season = parseInt(req.query.season, 10);
        const response = await axios.get(`http://localhost:3001/api/get-standings-up-to-round?competition_id=${competition_id}&season=${season}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error trying to get standings up to round');
    }
});

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
router.get('/get-head-2-head-games', async function (req, res) {
    try {
        const home_club_id = req.query.home_club_id;
        const away_club_id = req.query.away_club_id;
        const response = await axios.get(`http://localhost:3001/api/get-head-2-head-games?home_club_id=${home_club_id}&away_club_id=${away_club_id}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error trying to get head-to-head games');
    }
});

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
router.get('/get-club-last-game', async function (req, res) {
    try {
        const club_id = req.query.club_id;
        const response = await axios.get(`http://localhost:3001/api/get-club-last-game?club_id=${club_id}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error trying to get the club s last game');
    }
});

module.exports = router;

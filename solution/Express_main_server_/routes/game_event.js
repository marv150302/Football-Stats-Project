
const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * @swagger
 * /api/game-events/get-all-game-events:
 *   get:
 *     summary: Retrieve a list of all game events
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
router.get('/get-all-game-events', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:3001/api/get-all-game-events');
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error trying to get all game events');
    }
});

/**
 * @swagger
 * /api/game-events/get-all-game-events-by-game-id:
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
router.get('/get-all-game-events-by-game-id', async function (req, res) {
    try {
        const game_id = req.query.game_id;
        const response = await axios.get(`http://localhost:3001/api/get-all-game-events-by-game-id?game_id=${game_id}`);
    res.json(response.data);
} catch (error) {
    console.error(error);
    res.status(500).send('Error trying to get all game events by game ID');
}
});

module.exports = router;
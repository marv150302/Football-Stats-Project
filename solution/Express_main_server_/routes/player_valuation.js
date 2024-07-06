const express = require('express');
const router = express.Router();
const PLAYER_VALUATION_CONTROLLER = require('../controllers/player_valuation');

/**
 * @swagger
 * /api/player-valuation/get-all-players-valuation:
 *   get:
 *     summary: Retrieve a list of all player valuations
 *     responses:
 *       200:
 *         description: A list of player valuations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get-all-players-valuation', PLAYER_VALUATION_CONTROLLER.getAllPlayersValuation);

module.exports = router;

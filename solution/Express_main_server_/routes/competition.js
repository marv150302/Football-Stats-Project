const express = require('express');
const router = express.Router();
const COMPETITION_CONTROLLER = require('../controllers/competition');

/**
 * @swagger
 * /api/competitions/get-all-competitions:
 *   get:
 *     summary: Retrieve a list of all competitions
 *     responses:
 *       200:
 *         description: A list of competitions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get-all-competitions', COMPETITION_CONTROLLER.getAllCompetitions);

/**
 * @swagger
 * /api/competitions/get-competition-by-id:
 *   get:
 *     summary: Retrieve competition information by its ID
 *     parameters:
 *       - name: competition_id
 *         in: query
 *         required: true
 *         description: The ID of the competition
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Competition information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 competition_id:
 *                   type: integer
 *                   description: The ID of the competition
 *                 name:
 *                   type: string
 *                   description: The name of the competition
 *
 */
router.get('/get-competition-by-id', COMPETITION_CONTROLLER.getCompetitionById);

module.exports = router;

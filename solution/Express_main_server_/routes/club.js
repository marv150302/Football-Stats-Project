const express = require('express');
const router = express.Router();
const CLUB_CONTROLLER = require('../controllers/club');

/**
 * @swagger
 * /api/clubs/get-all-clubs:
 *   get:
 *     summary: Retrieve a list of all clubs
 *     responses:
 *       200:
 *         description: A list of clubs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get-all-clubs', CLUB_CONTROLLER.getAllClubs);

/**
 * @swagger
 * /api/clubs/get-club-data-by-id:
 *   get:
 *     summary: Retrieve club information by its ID
 *     parameters:
 *       - name: club_id
 *         in: query
 *         required: true
 *         description: The ID of the club
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Club information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 club_id:
 *                   type: integer
 *                   description: The ID of the club
 *                 name:
 *                   type: string
 *                   description: The name of the club
 *
 */
router.get('/get-club-data-by-id', CLUB_CONTROLLER.getClubDataById);

/**
 * @swagger
 * /api/clubs/get-club-players:
 *   get:
 *     summary: Retrieve all players belonging to a club
 *     parameters:
 *       - name: club_id
 *         in: query
 *         required: true
 *         description: The ID of the club
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of players belonging to the club
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get-club-players', CLUB_CONTROLLER.getClubPlayers);

module.exports = router;

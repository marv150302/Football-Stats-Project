const express = require('express');
const router = express.Router();
const CLUB_GAMES = require('../models/club_games');
const CLUB_GAMES_CONTROLLER = require('../controllers/club_games');


/**
 * Route to retrieve all club games
 */
router.get('/club-games', CLUB_GAMES_CONTROLLER.getAllClubGames);

/**
 * Route to retrieve a specific club game by ID
 * @param{string} id - the id of the game
 */
router.get('/club-games/:id', async (req, res) => {
    try {
        const clubGame = await CLUB_GAMES.findById(req.params.id);
        if (!clubGame) {
            return res.status(404).json({ error: 'Club game not found' });
        }
        res.json(clubGame);
    } catch (error) {
        console.error('Error retrieving club game:', error);
        res.status(500).json({ error: 'Failed to retrieve club game' });
    }
});


module.exports = router;

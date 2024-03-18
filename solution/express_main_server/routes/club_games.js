const express = require('express');
const router = express.Router();
const ClubGames = require('../models/club_games');
const CLUB_GAMES_CONTROLLER = require('../controllers/club_games');


// Route to retrieve all club games
router.get('/club-games', CLUB_GAMES_CONTROLLER.getAllClubGames);

// Route to retrieve a specific club game by ID
router.get('/club-games/:id', async (req, res) => {
    try {
        const clubGame = await ClubGames.findById(req.params.id);
        if (!clubGame) {
            return res.status(404).json({ error: 'Club game not found' });
        }
        res.json(clubGame);
    } catch (error) {
        console.error('Error retrieving club game:', error);
        res.status(500).json({ error: 'Failed to retrieve club game' });
    }
});

// Add more routes as needed for CRUD operations

module.exports = router;

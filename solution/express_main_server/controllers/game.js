const Game = require('../models/Game');

const getAllGames = async (req, res) => {
    try {
        const games = await Game.find().limit(10);
        res.json(games);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({ error: 'Failed to fetch games' });
    }
};

module.exports = { getAllGames };

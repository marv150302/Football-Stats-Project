const GameEvent = require('../models/game_event');

// Function to retrieve all game events
const getAllGameEvents = async (req, res) => {
    try {
        const gameEvents = await GameEvent.find().limit(10);
        res.json(gameEvents);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve game events' });
    }
};

module.exports = { getAllGameEvents };

const GameEvent = require('../models/game_event');

/**
 * Function to retrieve all game events
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getAllGameEvents = async (req, res) => {
    try {
        const gameEvents = await GameEvent.find().limit(10);
        res.json(gameEvents);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve game events' });
    }
};

/**
 * Function to retrieve all game events by its ID
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getAllGameEventsById = async (req, res) => {
    try {
        const  game_id  = req.query.game_id; // Assuming game_id is passed as a URL parameter

        // Find game events filtered by game_id
        const gameEvents = await GameEvent.find({'game_id': game_id });

        res.json(gameEvents);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve game events by id' });
    }
};




module.exports = { getAllGameEvents, getAllGameEventsById };

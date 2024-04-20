const Game = require('../models/Game');

/**
 * function to get all games on the database
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getAllGames = async (req, res) => {
    try {
        const games = await Game.find()
        res.json(games);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({ error: 'Failed to fetch games' });
    }
};

/**
 *
 * function to get the latest game by competition id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getLatestGameByCompetition = async (req, res) => {
    try {
        const competitionId = req.query.competition_id;

        const latest_game = await Game.findOne(
            { 'competition_id': competitionId },
            {},
            { sort: { 'date': -1 } }
        );

        if (latest_game) {
            console.log('Latest game:');
            console.log(latest_game);
            res.json(latest_game);
        } else {
            console.log('No games found');
            res.status(404).json({ error: 'No games found' });
        }
    } catch (error) {
        console.error('Error finding latest  game:', error);
        res.status(500).json({ error: 'Failed to fetch latest game' }); // Return 500 if an error occurs
    }
}

/**
 * funcntion to get the last four games by the competition id and the year
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getLastFourGamesByCompetitionAndYear = async (req, res) => {
    try {
        const competitionId = req.query.competition_id; // Get the competition_id from the request query
        const year = req.query.year; // Get the year from the request query

        // Find the last four games for the specified competition_id and year
        const lastFourGames = await Game.find(
            {
                'competition_id': competitionId,
                'date': {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }
            },
            {},
            { sort: { 'date': -1 }, limit: 4 } // Sort by date in descending order and limit to 4
        );

        if (lastFourGames && lastFourGames.length > 0) {
            console.log('Last four games:');
            console.log(lastFourGames);
            res.json(lastFourGames); // Return the last four games as JSON response
        } else {
            console.log('No games found');
            res.status(404).json({ error: 'No games found for the given competition ID and year' }); // Return 404 if no games are found
        }
    } catch (error) {
        console.error('Error finding last four games:', error);
        res.status(500).json({ error: 'Failed to fetch last four games' }); // Return 500 if an error occurs
    }
}






module.exports = { getAllGames, getLatestGameByCompetition, getLastFourGamesByCompetitionAndYear};

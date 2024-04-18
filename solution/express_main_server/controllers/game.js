const Game = require('../models/Game');

const getAllGames = async (req, res) => {
    try {
        const games = await Game.find()
        res.json(games);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({ error: 'Failed to fetch games' });
    }
};

const getLatestGameByCompetition = async (req, res) => {
    try {
        const competitionId = req.query.competition_id; // Get the competition_id from the request query

        // Find the latest Serie A game with the specified competition_id
        const latest_game = await Game.findOne(
            { 'competition_id': competitionId },
            {},
            { sort: { 'date': -1 } } // Sort by date in descending order (latest first)
        );

        if (latest_game) {
            console.log('Latest game:');
            console.log(latest_game);
            res.json(latest_game); // Return the latest Serie A game as JSON response
        } else {
            console.log('No games found');
            res.status(404).json({ error: 'No games found' }); // Return 404 if no Serie A games are found
        }
    } catch (error) {
        console.error('Error finding latest  game:', error);
        res.status(500).json({ error: 'Failed to fetch latest game' }); // Return 500 if an error occurs
    }
}




module.exports = { getAllGames, getLatestGameByCompetition};

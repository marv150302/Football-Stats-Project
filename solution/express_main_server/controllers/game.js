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
const getLastFourGamesByCompetition = async (req, res) => {
    try {
        const year = req.query.year; // Get the year from the request query
        const competitionId = req.query.competitionId; // Array of competition IDs

        let importantGames = [];

        const games = await Game.find(
            {
                'competition_id': competitionId,
                'date': { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) }
            },
            'date home_club_name away_club_name home_club_goals away_club_goals stadium attendance referee home_club_position away_club_position season competition_type',
            { sort: { 'date': -1 }, limit: 4 } // Sort by date descending, limit to 4
        );

        if (games.length > 0) {
            importantGames.push({
                competitionId: competitionId,
                games: games
            });
        }

        if (importantGames.length > 0) {
            console.log('Last 4 games by competition:', importantGames);
            res.json(importantGames); // Return the filtered game data as JSON response
        } else {
            console.log('No games found');
            res.status(404).json({ error: 'No games found for the given competitions and year' });
        }
    } catch (error) {
        console.error('Error fetching game info:', error);
        res.status(500).json({ error: 'Failed to fetch game info' });
    }
}





module.exports = { getAllGames, getLatestGameByCompetition, getLastFourGamesByCompetition};

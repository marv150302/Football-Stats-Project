const AXIOS = require('axios');
const APPEARANCES = require('../models/appearances');
const JAVA_SPRING_SERVER_URL = 'http://localhost:8081/players';


/**
 * function that retrieves all the appearances info
 * returns a json containing all appearances
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getAllAppearances(req, res) {
    try {
        // Retrieve all documents from the collection
        const data = await APPEARANCES.find().limit(10);
        res.json(data);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 *
 * function that retrieves the ID of the player that scored the most goals
 * returns a json containing the ID of the player and the total goals scored by the player
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getTopScorerId(req, res){


    try {
        const topScorer = await APPEARANCES.aggregate([
            {
                $group: {
                    _id: "$player_id", // Group by player_id
                    //playerName: { $first: "$player_name" }, // Use $first to get the player's name (assuming it's consistent across documents for the same player)
                    totalGoals: { $sum: "$goals" }, // Use $sum to accumulate goals
                }
            },
            { $sort: { totalGoals: -1 }}, // Sort by totalGoals in descending order
            { $limit: 1 } // Limit to the top scorer
        ]);

        res.json(topScorer);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}
const getTopScorersByCompetitionAndYear = async (req, res) => {
    try {
        const competitionId = req.query.competition_id; // Get the competition_id from the request query
        const year = parseInt(req.query.year); // Get the year from the request query

        const pipeline = [
            {
                $addFields: {
                    year: { $year: "$date" }
                }
            },
            {
                $match: {
                    competition_id: competitionId,
                    year: year
                }
            },
            {
                $group: {
                    _id: "$player_id",
                    total_goals: { $sum: "$goals" },
                    player_name: { $first: "$player_name" },
                }
            },
            {
                $sort: {
                    total_goals: -1
                }
            },
            {
                $limit: 3
            }
        ];

        const topScorers = await APPEARANCES.aggregate(pipeline);

        if (topScorers.length > 0) {
            console.log('Top Scorers:', topScorers);
            res.json(topScorers); // Return the top scorers as JSON response
        } else {
            console.log('No top scorers found');
            res.status(404).json({ error: 'No top scorers found' }); // Return 404 if no top scorers are found
        }
    } catch (error) {
        console.error('Error finding top scorers:', error);
        res.status(500).json({ error: 'Failed to fetch top scorers' }); // Return 500 if an error occurs
    }
};
module.exports = {
    getAllAppearances,
    getTopScorer: getTopScorerId,
    getTopScorersByCompetitionAndYear
};

const APPEARANCES = require('../models/appearances');
const AXIOS = require('axios');


/**
 * function that retrieves all the appearances info
 * returns a json containing all appearances
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getAllAppearances(req, res) {
    try {

        const data = await APPEARANCES.find().limit(10);
        res.json(data);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}


/**
 * Function that retrieves the total number of goals scored by a player.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getTotalGoalsByPlayerId(req, res) {
    try {
        const playerId = parseInt(req.params.playerId); // Get the player ID from the request parameters

        const totalGoals = await APPEARANCES.aggregate([
            {
                $match: {player_id: playerId} // Match appearances for the specified player ID
            },
            {
                $group: {
                    _id: null,
                    totalGoals: {$sum: "$goals"} // Calculate the total goals using $sum aggregation
                }
            }
        ]);

        // Return the total goals as JSON response
        res.json({playerId, totalGoals: totalGoals.length > 0 ? totalGoals[0].totalGoals : 0});
    } catch (error) {
        console.error('Error retrieving total goals:', error);
        res.status(500).json({error: 'Internal server error'});
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
async function getTopScorerId(req, res) {


    try {
        const topScorer = await APPEARANCES.aggregate([
            {
                $group: {
                    _id: "$player_id", // Group by player_id
                    //playerName: { $first: "$player_name" }, // Use $first to get the player's name (assuming it's consistent across documents for the same player)
                    totalGoals: {$sum: "$goals"}, // Use $sum to accumulate goals
                }
            },
            {$sort: {totalGoals: -1}}, // Sort by totalGoals in descending order
            {$limit: 1} // Limit to the top scorer
        ]);

        res.json(topScorer);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}

/**
 *
 * function to get all the appearances by the game id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getAllAppearancesByGameId(req, res) {
    try {
        const appearances_ = await APPEARANCES.find({game_id: req.query.game_id});
        res.json(appearances_);
    } catch (err) {
        console.error(err);
        throw new Error("Failed to retrieve appearances by game ID");
    }
}

/**
 * Function to get the total number of goals and assists for a specific player and season.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getTotalGoalsAndAssistsForPlayerAndSeason(req, res) {
    try {
        const player_id = parseInt(req.query.player_id);
        const season = parseInt(req.query.season);

        const playerStats = await APPEARANCES.aggregate([
            {
                $lookup: {
                    from: "games",
                    localField: "game_id",
                    foreignField: "game_id",
                    as: "gameInfo"
                }
            },
            {
                $unwind: "$gameInfo"
            },
            {
                $match: {
                    "gameInfo.season": season,
                    "player_id": player_id
                }
            },
            {
                $group: {
                    _id: null,
                    totalAppearances: {$sum: 1},
                    totalGoals: {$sum: "$goals"},
                    totalAssists: {$sum: "$assists"},
                    totalYellowCards: {$sum: "$yellow_cards"},
                    totalRedCards: {$sum: "$red_cards"},
                    totalMinutesPlayed: {$sum: "$minutes_played"}
                }
            }
        ]);

        console.log(playerStats)
        if (playerStats.length > 0) {
            const {
                totalAppearances,
                totalGoals,
                totalAssists,
                totalYellowCards,
                totalRedCards,
                totalMinutesPlayed
            } = playerStats[0];

            res.json({
                totalAppearances,
                totalGoals,
                totalAssists,
                totalYellowCards,
                totalRedCards,
                totalMinutesPlayed
            });
        } else {
            res.status(404).json({error: "No player stats found for the specified player and season"});
        }
    } catch (error) {
        console.error("Error retrieving player stats:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

/**
 * function to get the top scorer in a competition in a certain season
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getTopScorersByCompetitionAndYear = async (req, res) => {
    try {
        const competitionId = req.query.competition_id;
        const year = parseInt(req.query.year);

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
                    club_id: { $first: "$player_current_club_id" }
                }
            },
            {
                $sort: {
                    total_goals: -1
                }
            },
            {
                $limit: 14
            }
        ];

        const topScorers = await APPEARANCES.aggregate(pipeline);

        if (topScorers.length > 0) {
            console.log('Top Scorers:', topScorers);

            // Making a call to getPlayerDataById route for each top scorer
            const playerDetailsPromises = topScorers.map(async (scorer) => {
                try {
                    const response = await AXIOS.get(`http://localhost:3000/api/get-player-data-by-id?playerId=${scorer._id}`); // Adjust the URL to match your Express server
                    scorer.playerDetails = response.data; // Attach player details to the scorer object
                } catch (error) {
                    console.error(`Error fetching data for player ${scorer._id}:`, error);
                    scorer.playerDetails = null; // If there's an error, set playerDetails to null
                }
            });

            // Wait for all player details to be fetched
            await Promise.all(playerDetailsPromises);

            res.json(topScorers); // Return the top scorers with player details as JSON response
        } else {
            console.log('No top scorers found');
            res.status(404).json({ error: 'No top scorers found' });
        }
    } catch (error) {
        console.error('Error finding top scorers:', error);
        res.status(500).json({ error: 'Failed to fetch top scorers' });
    }
};

/**
 *
 * *****Currently not using******
 *
 * function to get the player's club history by the player id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getPlayerClubHistory(req, res) {
    try {
        const player_id = parseInt(req.params.player_id);

        // Aggregate pipeline to fetch player's club history
        const clubHistory = await APPEARANCES.aggregate([
            // Match appearances for the given player_id
            {$match: {player_id: player_id}},

            // Lookup games based on game_id
            {
                $lookup: {
                    from: "games",
                    localField: "game_id",
                    foreignField: "game_id",
                    as: "gameInfo"
                }
            },

            // Unwind the gameInfo array
            {
                $unwind: {
                    "path": "$gameInfo",
                    "preserveNullAndEmptyArrays": false
                }
            },

            // Project only the relevant fields from games (home_club_id and away_club_id)
            {
                $project: {
                    _id: 0,
                    club_ids: ["$gameInfo.home_club_id", "$gameInfo.away_club_id"]
                }
            },

            // Unwind the club_ids array
            {
                $unwind: {
                    "path": "$club_ids",
                    "preserveNullAndEmptyArrays": false
                }
            },

            // Group by club_id to remove duplicates
            {
                $group: {
                    _id: "$club_ids"
                }
            }
        ]);
        // Extract club ids from the result
        const clubIds = clubHistory.map(item => item._id);

        res.json(clubIds);
    } catch (error) {
        console.error("Error fetching player's club history:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {
    getAllAppearances,
    getTopScorer: getTopScorerId,
    getTopScorersByCompetitionAndYear,
    getAllAppearancesByGameId,
    getTotalGoalsAndAssistsForPlayerAndSeason,
    getPlayerClubHistory
};

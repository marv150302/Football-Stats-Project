const CLUB_GAMES = require('../models/club_games');

/**
 * Function to retrieve all games
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getAllClubGames(req, res) {
    try {
        // Retrieve all documents from the collection
        const data = await CLUB_GAMES.find().limit(10);
        res.json(data);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * function to get club games by game id and club id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getClubGameByGameIdAndClubId(req, res) {
    try {
        // Extract game_id and club_id from request query
        const { game_id, club_id } = req.query;

        // Validate game_id and club_id
        if (!game_id || !club_id) {
            return res.status(400).json({ error: 'game_id and club_id are required parameters' });
        }

        // Retrieve club game documents based on game_id and club_id
        const data = await CLUB_GAMES.find({ game_id: game_id, club_id: club_id }).limit(1);

        // Check if any documents were found
        if (data.length === 0) {
            return res.status(404).json({ error: 'Club game not found' });
        }

        // Return the retrieved club game
        res.json(data);
    } catch (error) {
        console.error('Error retrieving club game data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Function to get club standing
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getClubStandingData(req,res){

    try {
        const gameRound  = req.query.gameRound;
        const competition_id = req.query.competition_id;

        /*
        // Retrieve all club games from the provided matchday and competition type
        const clubGames = await CLUB_GAMES.aggregate([
            {
                $match: {
                    round: gameRound,
                    competition_id: competition_id
                }
            },
            {
                $lookup: {
                    from: "games", // Collection to join
                    localField: "game_id", // Field from club_games
                    foreignField: "game_id", // Field from games
                    as: "gameInfo" // Alias for the joined data
                }
            },
            {
                $unwind: "$gameInfo" // Unwind the array field created by lookup
            }
        ]);

        // Initialize statistics object
        const clubStats = {};

        // Iterate over club games to calculate statistics for each club
        clubGames.forEach(game => {
            const { club_id, own_goals, opponent_goals, is_win } = game;

            // Initialize club stats if not already present
            if (!clubStats[club_id]) {
                clubStats[club_id] = {
                    wins: 0,
                    draws: 0,
                    losses: 0,
                    totalGoalsScored: 0,
                    totalGoalsTaken: 0,
                    totalPoints: 0,
                    position: game.own_position // Use the provided position
                };
            }

            // Update wins, draws, and losses
            if (is_win === 1) {
                clubStats[club_id].wins++;
            } else if (is_win === 0) {
                clubStats[club_id].draws++;
            } else {
                clubStats[club_id].losses++;
            }

            // Update total goals scored and taken
            clubStats[club_id].totalGoalsScored += own_goals;
            clubStats[club_id].totalGoalsTaken += opponent_goals;

            // Calculate total points
            clubStats[club_id].totalPoints = clubStats[club_id].wins * 3 + clubStats[club_id].draws;
        });*/


        /*const result = await GAMES.aggregate([
            {
                $match: {
                    round: gameRound,
                    competition_id: competition_id
                }
            },
            {
                $lookup: {
                    from: "club_games", // Name of the club_games collection
                    localField: "game_id",
                    foreignField: "game_id",
                    as: "clubGameInfo"
                }
            },
            {
                $unwind: "$clubGameInfo" // Unwind the array field created by the $lookup stage
            },
            {
                $project: {
                    _id: 0,
                    home_club_name: 1,
                    away_club_name: 1,
                    own_goals: "$clubGameInfo.own_goals",
                    opponent_goals: "$clubGameInfo.opponent_goals",
                    own_position: "$clubGameInfo.own_position",
                    game_id: 1,
                    round: 1,
                    competition_id: 1,
                    // Add more fields from club_games or games collection as needed
                }
            }
        ]);
        res.json(result);

       res.json(clubStats);*/
    } catch (error) {
        console.error('Error calculating club stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllClubGames,
    getClubGameByGameIdAndClubId,
    getClubStandingData
};

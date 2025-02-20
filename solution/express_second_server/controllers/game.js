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
        res.status(500).json({error: 'Failed to fetch games'});
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
            {'competition_id': competitionId},
            {},
            {sort: {'date': -1}}
        );

        if (latest_game) {
            console.log('Latest game:');
            console.log(latest_game);
            res.json(latest_game);
        } else {
            console.log('No games found');
            res.status(404).json({error: 'No games found'});
        }
    } catch (error) {
        console.error('Error finding latest  game:', error);
        res.status(500).json({error: 'Failed to fetch latest game'}); // Return 500 if an error occurs
    }
}

/**
 * Function to retrieve the club's last game by its id
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getClubLastGame = async (req, res) =>{

    try {
        const clubId = req.query.club_id;
        // Find the latest game for the given club_id
        const latestGame = await Game.findOne({ $or: [{ home_club_id: clubId }, { away_club_id: clubId }] })
            .sort({ date: -1 }) // Sort by date in descending order to get the latest game
            .exec();

        if (!latestGame) {
            return res.status(404).json({ message: 'No game found for the given club_id' });
        }

        res.json(latestGame);
    } catch (error) {
        console.error("Error retrieving latest game:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

/**
 * Function to get the last four games by the competition id and the year
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
            {sort: {'date': -1}, limit: 4} // Sort by date in descending order and limit to 4
        );

        if (lastFourGames && lastFourGames.length > 0) {
            //console.log('Last four games:');
            //console.log(lastFourGames);
            res.json(lastFourGames); // Return the last four games as JSON response
        } else {
            console.log('No games found');
            res.status(404).json({error: 'No games found for the given competition ID and year'}); // Return 404 if no games are found
        }
    } catch (error) {
        console.error('Error finding last four games:', error);
        res.status(500).json({error: 'Failed to fetch last four games'}); // Return 500 if an error occurs
    }
}

/**
 *
 * get all games by the competition and the season
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getAllGamesByCompetitionAndYear = async (req, res) => {
    try {
        const competitionId = req.query.competition_id; // Get the competition_id from the request query
        const season = parseInt(req.query.season); // Get the season from the request query


        // Aggregate pipeline to group games by round
        const games = await Game.aggregate([
            {
                $match: {
                    'competition_id': competitionId,
                    'season': season
                }
            },
            {
                $sort: {'date': -1} // Sort by date in descending order
            },
            {
                $group: {
                    _id: '$round',
                    games: {$push: '$$ROOT'} // Group games by round and store in an array
                }
            }
        ]);

        res.json(games); // Return the grouped games as JSON response
    } catch (error) {
        console.error('Error finding games:', error);
        res.status(500).json({error: 'Failed to fetch games'}); // Return 500 if an error occurs
    }
}

/**
 *
 * function for getting the information about a single game
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getGameInfo = async (req, res) => {
    try {
        const game_id = req.query.game_id;

        // Find the game by its game_id
        const game = await Game.findOne({game_id: game_id});

        if (game) {
            res.json(game);
        } else {
            // Game not found
            res.status(404).json({error: 'Game not found'});
        }
    } catch (error) {
        console.error('Error fetching game:', error);
        res.status(500).json({error: 'Failed to fetch game'});
    }
};

/**
 *
 * Function to get all head to head games
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const getHead2Head = async (req, res) => {
    try {
        const homeClubId = req.query.home_club_id;
        const awayClubId = req.query.away_club_id;

        // Retrieve all games involving either team
        const games = await Game.find({
            $or: [
                {$and: [{home_club_id: homeClubId}, {away_club_id: awayClubId}]},
                {$and: [{home_club_id: awayClubId}, {away_club_id: homeClubId}]}
            ]
        }).sort({date: 1});

        if (!games || games.length === 0) {
            return res.status(404).send({message: 'No games found for these teams.'});
        }

        // Filter and group games manually
        const filteredAndGroupedGames = groupGamesBySeason(games);

        res.json(filteredAndGroupedGames);
    } catch (error) {
        console.error('Error fetching head-to-head games:', error);
        res.status(500).send({message: "Server error", error: error});
    }
};

/**
 * function to group all the games by season
 * @param games the object containing all the games
 * @returns {{}}
 */
function groupGamesBySeason(games) {
    const grouped = {};
    games.forEach(game => {
        const season = game.season;
        if (!grouped[season]) {
            grouped[season] = [];
        }
        grouped[season].push(game);
    });

    // Sort the season keys which are strings of year numbers in descending order
    const sortedSeasons = Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a));

    const sortedGrouped = {};
    sortedSeasons.forEach(season => {
        sortedGrouped[season] = grouped[season];
    });

    return sortedGrouped;
}

const calculateClubStats = async (req, res) => {
    const date = req.query.date;
    const competition_id = req.query.competition_id;
    const season = parseInt(req.query.season)

    try {
        // Retrieve all games up to the specified round with the specified competition type
        const pipeline = [];

        // Match condition for season
        if (season) {
            pipeline.push({
                $match: {season: season}
            });
        }

        // Match condition for competition_id
        pipeline.push({
            $match: {competition_id: competition_id}
        });

        // Match condition for date
        if (date) {
            pipeline.push({
                $match: {
                    $expr: {
                        $lte: [{$toDate: "$date"}, {$toDate: date}]
                    }
                }
            });
        }

        // Add sorting stage to find the latest season and date
        pipeline.push({
            $sort: {season: -1, date: -1}
        });



        // Execute the aggregation pipeline
        const games = await Game.aggregate(pipeline);


        // Initialize club statistics object
        const clubStats = {};

        // Iterate over each game to calculate statistics for each club
        games.forEach(game => {
            const homeClub = game.home_club_id.toString();
            //const awayClub = game.away_club_id.toString();
            const homeGoals = game.home_club_goals;
            const awayGoals = game.away_club_goals;

            // Update home club statistics
            if (!clubStats[homeClub]) {
                clubStats[homeClub] = {
                    goalsScored: 0,
                    goalsTaken: 0,
                    matchesPlayed: 0,
                    points: 0,
                    name: game.home_club_name,
                    round: game.round,
                    wins: 0,
                    loss: 0,
                    drawn: 0
                };
            }
            clubStats[homeClub].goalsScored += homeGoals;
            clubStats[homeClub].goalsTaken += awayGoals;
            clubStats[homeClub].matchesPlayed++;
            if (homeGoals > awayGoals) {

                //win
                clubStats[homeClub].points += 3;
                clubStats[homeClub].wins++;
            } else if (homeGoals === awayGoals) {

                //draw
                clubStats[homeClub].points++;
                clubStats[homeClub].drawn++;
            } else {

                //loss
                clubStats[homeClub].loss++;
            }

        });

        res.json(getTeamStandings(clubStats));
    } catch (error) {
        console.error('Error calculating club stats:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}

/**
 *
 * function to get the clubs standings on the table
 * @param clubStats the object containing the clubs main stats besides the position
 * @returns {{wins: *, goalsTaken: *, loss: *, matchesPlayed: *, name: *, clubId: *, drawn: *, goalsScored: *, goalDifference: number, points: *}[]}
 */
function getTeamStandings(clubStats) {

    const clubStatsWithPosition = Object.keys(clubStats).map(clubId => {
        const {goalsScored, goalsTaken, matchesPlayed, points, name, round, wins, loss, drawn} = clubStats[clubId];
        const goalDifference = goalsScored - goalsTaken;

        return {
            clubId,
            goalsScored,
            goalsTaken,
            matchesPlayed,
            goalDifference,
            points,
            name,
            round,
            wins,
            loss,
            drawn
        };
    });

    clubStatsWithPosition.sort((a, b) => {
        if (a.points !== b.points) {
            return b.points - a.points; // Sort by points
        } else {
            return b.goalDifference - a.goalDifference; // If points are equal, sort by goal difference
        }
    });

    // Assign position based on sorted order
    clubStatsWithPosition.forEach((clubStats, index) => {
        clubStats.position = index + 1; // Add 1 to index since position starts from 1
    });

    return clubStatsWithPosition;
}


module.exports = {
    getAllGames,
    getLatestGameByCompetition,
    getLastFourGamesByCompetitionAndYear,
    getAllGamesByCompetitionAndYear,
    getGameInfo,
    calculateClubStats,
    getHead2Head,
    getClubLastGame
};

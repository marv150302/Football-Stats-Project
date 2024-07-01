const AXIOS = require('axios');
const JAVA_SPRING_SERVER_URL = 'http://localhost:8081/games-lineup';

/**
 *
 * function to get all the available game lineups
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getAllGamesLineup(req, res) {

    try {
        const response = await AXIOS.get(JAVA_SPRING_SERVER_URL + '/get-all-games-lineup');
        const clubs = response.data;
        // Handle the data retrieved from the Spring API ìì
        res.json(clubs);
    } catch (error) {
        // Handle errors
        console.error('Error fetching games lineup from Spring API:', error);
        res.status(500).json({error: 'Failed to fetch game lineup from Spring API'});
    }
}

/**
 *
 * get the games lineup by the game id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getGameLineupById(req, res) {

    try {
        const game_id = req.query.game_id;
        const response = await AXIOS.get(JAVA_SPRING_SERVER_URL + '/get-game-lineup-data-by-id'+'?game_id='+game_id);
        const clubs = response.data;
        // Handle the data retrieved from the Spring API ìì
        res.json(clubs);
    } catch (error) {
        // Handle errors
        console.error('Error fetching games lineup from Spring API:', error);
        res.status(500).json({error: 'Failed to fetch game lineup from Spring API'});
    }
}

/**
 *
 * function to get the player's club history by using the history of his game lineups appearances
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getPlayerClubAppearanceHistory(req, res) {

    try {
        const player_id = req.query.player_id;
        const response = await AXIOS.get(JAVA_SPRING_SERVER_URL + '/get-player-club-history'+'?player_id='+player_id);
        const clubs = response.data;
        res.json(clubs);
    } catch (error) {
        // Handle errors
        console.error('Error fetching the club history from Spring API:', error);z
        res.status(500).json({error: 'Failed to fetch club history from Spring API'});
    }
}

module.exports = {
    getAllGamesLineup,
    getGameLineupById,
    getPlayerClubAppearanceHistory

};
const AXIOS = require('axios');
const JAVA_SPRING_SERVER_URL = 'http://localhost:8081/players';

/**
 * function that return a json containing all players
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getAllPlayers(req, res) {

    try {
        const response = await AXIOS.get(JAVA_SPRING_SERVER_URL + '/get-all-players');
        const competitions = response.data;
        // Handle the data retrieved from the Spring API ìì
        res.json(competitions);
    } catch (error) {
        // Handle errors
        console.error('Error fetching players from Spring API:', error);
        res.status(500).json({error: 'Failed to fetch players from Spring API'});
    }
}

/**
 * function that returns a json containing specific player data
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getPlayerDataById(req, res) {


    const playerId = parseInt(req.query.playerId);
    try {
        const response = await AXIOS.get(JAVA_SPRING_SERVER_URL + '/get-player-data-by-id?playerId='+playerId);
        const competitions = response.data;
        // Handle the data retrieved from the Spring API ìì
        res.json(competitions);
    } catch (error) {
        // Handle errors
        console.error('Error fetching player data from Spring API:', error);
        res.status(500).json({error: 'Failed to fetch player data from Spring API'});
    }
}
module.exports = {
    getAllPlayers,
    getPlayerDataById,
};
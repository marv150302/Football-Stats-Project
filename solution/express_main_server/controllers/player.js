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
        res.json(competitions);
    } catch (error) {
        // Handle errors
        console.error('Error fetching player data from Spring API:', error);
        res.status(500).json({error: 'Failed to fetch player data from Spring API'});
    }
}

/**
 * Function to get player stats
 * NOTE: unused(replaced by better implementation)
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getPlayerStats(req, res){

    const playerId = parseInt(req.query.playerId);
    try {
        const response = await AXIOS.get(JAVA_SPRING_SERVER_URL + '/get-player-data-by-id?playerId='+playerId);
        const competitions = response.data;
        res.json(competitions);
    } catch (error) {
        // Handle errors
        console.error('Error fetching player data from Spring API:', error);
        res.status(500).json({error: 'Failed to fetch player data from Spring API'});
    }
}

/**
 * Function for searching for players in the database
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getPlayerByName(req, res){

    const name = req.query.name;
    try {
        const response = await AXIOS.get(JAVA_SPRING_SERVER_URL + '/get-player-by-name?name='+name);
        const players = response.data;
        res.json(players);
    } catch (error) {
        // Handle errors
        console.error('Error fetching players data from Spring API:', error);
        res.status(500).json({error: 'Failed to fetch playera data from Spring API'});
    }
}

module.exports = {
    getAllPlayers,
    getPlayerDataById,
    getPlayerByName
};
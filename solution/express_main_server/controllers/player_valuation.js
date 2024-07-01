const AXIOS = require('axios');
const JAVA_SPRING_SERVER_URL = 'http://localhost:8081/players-valuations';

/**
 * Function to get all player's valuations
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getAllPlayersValuation(req, res) {

    try {
        const response = await AXIOS.get(JAVA_SPRING_SERVER_URL + '/get-all-players-valuation');
        const competitions = response.data;
        // Handle the data retrieved from the Spring API ìì
        res.json(competitions);
    } catch (error) {
        // Handle errors
        console.error('Error fetching players valuations from Spring API:', error);
        res.status(500).json({error: 'Failed to fetch players valuation from Spring API'});
    }
}

module.exports = {
    getAllPlayersValuation
};
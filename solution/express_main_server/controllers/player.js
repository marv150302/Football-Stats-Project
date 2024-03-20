const AXIOS = require('axios');
const JAVA_SPRING_SERVER_URL = 'http://localhost:8081';

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

module.exports = {
    getAllPlayers
};
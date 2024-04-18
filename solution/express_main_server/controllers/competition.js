const AXIOS = require('axios');
const JAVA_SPRING_SERVER_URL = 'http://localhost:8081/competitions';

async function getAllCompetitions(req, res) {

    try {
        const response = await AXIOS.get(JAVA_SPRING_SERVER_URL + '/get-all-competitions');
        const competitions = response.data;
        // Handle the data retrieved from the Spring API ìì
        res.json(competitions);
    } catch (error) {
        // Handle errors
        console.error('Error fetching competitions from Spring API:', error);
        res.status(500).json({error: 'Failed to fetch competitions from Spring API'});
    }
}


module.exports = {
    getAllCompetitions,
};
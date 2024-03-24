const AXIOS = require('axios');
const JAVA_SPRING_SERVER_URL = 'http://localhost:8081/clubs';

async function getAllClubs(req, res) {

    try {
        const response = await AXIOS.get(JAVA_SPRING_SERVER_URL + '/get-all-clubs');
        const clubs = response.data;
        // Handle the data retrieved from the Spring API ìì
        res.json(clubs);
    } catch (error) {
        // Handle errors
        console.error('Error fetching clubs from Spring API:', error);
        res.status(500).json({error: 'Failed to fetch clubs from Spring API'});
    }
}

module.exports = {
    getAllClubs
};
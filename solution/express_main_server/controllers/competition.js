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


/**
 *
 * Function to get competition data by its ID
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getCompetitionById(req, res) {

    const id = req.query.competition_id;

    try {
        const response = await AXIOS.get(JAVA_SPRING_SERVER_URL + '/get-competition-by-id?competition_id=' + id);
        const competitions = response.data;
        // Handle the data retrieved from the Spring API ìì
        res.json(competitions);
    } catch (error) {
        // Handle errors
        console.error('Error fetching competition from Spring API:', error);
        res.status(500).json({error: 'Failed to fetch competition from Spring API'});
    }
}




module.exports = {
    getAllCompetitions,
    getCompetitionById
};
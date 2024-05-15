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

/**
 * function to retrieve all club data by the club id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getClubDataById(req, res) {

    const club_id = req.query.club_id
    console.log(club_id)
    try {
        const response = await AXIOS.get(JAVA_SPRING_SERVER_URL + '/get-club-data-by-id?club_id=' + club_id);
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
    getAllClubs,
    getClubDataById
};
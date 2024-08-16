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
    try {
        const response = await AXIOS.get(JAVA_SPRING_SERVER_URL + '/get-club-data-by-id?club_id=' + club_id);
        const clubs = response.data;
        res.json(clubs);
    } catch (error) {
        // Handle errors
        console.error('Error fetching club data from Spring API:', error);
        res.status(500).json({error: 'Failed to fetch club data from Spring API'});
    }
}

/**
 *
 * Function used to fetch the list of players from a club by its id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getClubPlayers(req, res){

    const club_id = req.query.club_id;
    try{

        const response = await AXIOS.get("http://localhost:8081/players/get-club-players?clubId=" + club_id);
        const players = response.data;

        res.json(players);
    }catch(error){

        console.log("Error in fetching the list of players for club id: " + club_id, error);
        res.status(500).json({error: 'Failed to fetch the list of players'})
    }
}


module.exports = {
    getAllClubs,
    getClubDataById,
    getClubPlayers
};
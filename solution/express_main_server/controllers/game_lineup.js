const AXIOS = require('axios');
const JAVA_SPRING_SERVER_URL = 'http://localhost:8081/games-lineup';

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

module.exports = {
    getAllGamesLineup,
    getGameLineupById
};
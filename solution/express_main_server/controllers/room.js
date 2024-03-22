
const AXIOS = require('axios');
const JAVA_SPRING_SERVER_URL = 'http://localhost:8081';

async function getRoomList(req, res) {

    try {
        const club_rooms = (await AXIOS.get(JAVA_SPRING_SERVER_URL + '/clubs/get-all-clubs-name')).data;
        const championship_rooms = (await AXIOS.get(JAVA_SPRING_SERVER_URL + '/competitions/get-all-competitions-name')).data;

        //join the room names
        res.json(club_rooms.concat(championship_rooms));
    } catch (error) {
        // Handle errors
        console.error('Error fetching the room list:', error);
        res.status(500).json({error: 'Failed to fetch room list '});
    }
}

module.exports = {
    getRoomList
};
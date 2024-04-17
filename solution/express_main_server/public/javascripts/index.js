document.addEventListener('DOMContentLoaded', function() {

   // getTopScorer();
    getLatestSerieAGame();
});


function loadTopScoerData(player) {

    console.log(player)
    document.getElementById('top-goal-scorer-img').src = player.imageUrl;
}

/**
 * function used to get all the info about the top scoring player
 * once the player's ID has been retrieved
 */
function getTopScorer() {
    getTopScorerID().then(player_id => {

        sendAxiosQuery('/api/get-player-data-by-id', { playerId: player_id._id })
            .then(data => {

                loadTopScoerData(data)
                //console.log('Player Data:', data);
            })
            .catch(error => {
                console.error('Failed to fetch player data:', error);
            });
    })


}

/**
 *
 * Function used to get the latest serie A game to display on the homepage
 */
function getLatestSerieAGame() {

    sendAxiosQuery('/api/get-latest-serie-a-game')
        .then(data => {

            loadLatestSerieAGame(data)
        })
}

function loadLatestSerieAGame(data){

    document.getElementById("game-round-index").innerText += " " + data['round']
    document.getElementById("home-team-index").innerText = data['home_club_name'];
    document.getElementById("away-team-index").innerText = data['away_club_name'];
    document.getElementById("game-score-index").innerText = data['aggregate']

    const dateString = data['date'];
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    document.getElementById('game-date-index').innerText += " " + date.toLocaleDateString('en-US', options)

}
/**
 * Function used to get both the ID of the player
 * @returns {*}
 */
function getTopScorerID() {

    return axios.get('/api/top-scorer-id')
        .then(response => {

            return response.data[0];
            //getTopScorer(player_id)
        })
        .catch(error => {

            console.error('Error:', error);
        });
}

/**
 * Function to send Axios requests.
 * @param {string} url The URL to send the request to.
 * @param {Object} params The parameters object to be sent with the request.
 */
function sendAxiosQuery(url, params = {}) {
    return axios.get(url, { params })
        .then(response => {
            return response.data; // Return the response data for further processing
        })
        .catch(error => {
            console.error('Axios request failed:', error);
            throw error; // Rethrow the error for handling in the calling function
        });
}

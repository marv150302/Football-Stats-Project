document.addEventListener('DOMContentLoaded', function() {

    getTopScorer();
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

document.addEventListener('DOMContentLoaded', function() {

    getLatestGame();
    getTopScorersByCompetitionAndYear();
});



function loadTopScoerData(player) {

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
 * function used to load the latest serie a game on the main page
 * @param data  the data of the match
 * @param competition the name of the competitionn
 */
function loadLatestGameByCompetition(data, competition){

    console.log("away-team-image-index-"+competition)
    document.getElementById("game-round-index-"+competition).innerText += " " + data['round']
    document.getElementById("home-team-index-"+competition).innerText = data['home_club_name'];
    document.getElementById("away-team-index-"+competition).innerText = data['away_club_name'];
    document.getElementById("game-score-index-"+competition).innerText = data['aggregate']
    document.getElementById("home-team-image-index-"+competition).src = "https://tmssl.akamaized.net/images/wappen/head/" + data['home_club_id'] + ".png"
    document.getElementById("away-team-image-index-"+competition).src = "https://tmssl.akamaized.net/images/wappen/head/" + data['away_club_id'] + ".png"

    const dateString = data['date'];
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    document.getElementById('game-date-index-'+competition).innerText += " " + date.toLocaleDateString('en-US', options)

}

/**
 * function to get the latest premier league game
 */
function getLatestGame() {

    let competitions = ['IT1','FR1'];
    let competition_name = ['serie-a', 'ligue-1']

    competitions.forEach((competition, index) =>{

        sendAxiosQuery('/api/get-latest-game-by-competition', {competition_id: competition})
            .then(data => {

                loadLatestGameByCompetition(data,competition_name[index]);
            })
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
 * Function to retrieve the id and the total of goals
 * of the top three players, from three competitons
 */
function getTopScorersByCompetitionAndYear() {

    let competitions = ['IT1','GB1', 'L1'];
    let competition_name = ['serie-a', 'premier-league', 'bundesliga']
    let year = 2023;
    competitions.forEach((competition, index) =>{

        sendAxiosQuery('/api/get-top-scorer-by-competition-and-year', {competition_id: competition, year:year})
            .then(data => {

                loadTopScorers(data, competition_name[index]);
            })
    })
}

/**
 *
 * function used to load the top 3 scorers in the top 3 leagues in the world
 * @param data the players data
 * @param competition the competition name
 */
function loadTopScorers(data, competition) {

    data.forEach((player, index) => {

        let name = (index+1) + "-name-" + competition;
        let goals = (index+1) + "-goals-" + competition;
        document.getElementById(name).innerText = (index+1) + " - " +  player['player_name'];
        document.getElementById(goals).innerText = " " +player['total_goals'];
    })
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

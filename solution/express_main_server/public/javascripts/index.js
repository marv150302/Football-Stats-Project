/**
 *
 * function used to load the latest game by competition on the main page dynamically
 * @param data  the data of the match
 * @param competition the name of the competition
 */
function loadLatestGameByCompetition(data, competition){



    const dateString = data['date'];
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const game_link = '/games/game-info?game_id=' + data.game_id
        + '&date=' + data.date
        + '&season=' + data.season
        + '&competition_id=' + data.competition_id
        + '&home_club_id=' + data.home_club_id
        + '&away_club_id=' + data.away_club_id;

    competition = competition
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    document.getElementById('main-domestic-leagues-latest-game').innerHTML += `<div class="col-md-3 mb-3">
                <div class="card h-100 bg-dark text-light">
                    <a href=${game_link} id="index-1-game">
                        <div class="card-body">
                            <h3 id="game-round-index-laliga" class="card-title fw-bold text-success">${competition} </h3>
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <div class="text-center">
                                    <h6 id="home-team-index-laliga">${data.home_club_name}</h6>
                                    <img id="" src="${"https://tmssl.akamaized.net/images/wappen/head/" + data['home_club_id'] + ".png"}" alt="Home Team Logo" class="img-fluid w-25">
                                </div>
                                <div>
                                    <h2 id="">${data['aggregate']}</h2>
                                </div>
                                <div class="text-center">
                                    <h6 id="">${data.away_club_name}</h6>
                                    <img id="" src="${"https://tmssl.akamaized.net/images/wappen/head/" + data['away_club_id'] + ".png"}" alt="Team B Logo" class="img-fluid w-25">
                                </div>
                            </div>
                            <p id="" class="card-text">Match played on: ${date.toLocaleDateString('en-US', options)}</p>
                        </div>
                    </a>
                </div>
            </div>`
}


/**
 * function to get the latest premier league game
 */
function getLatestGame() {

    let competitions = ['ES1','FR1', 'L1', 'IT1', 'GB1'];
    let competition_name = ['laliga', 'ligue-1', 'bundesliga', 'serie-a', 'premier-league']

    competitions.forEach((competition, index) =>{
        console.log(index)
        sendAxiosQuery('/api/get-latest-game-by-competition', {competition_id: competition})
            .then(data => {

                loadLatestGameByCompetition(data,competition_name[index], index);
            })
    })
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
 *
 * function used to get the player nae by his id
 * @param playerId the id of the player in question
 * @returns {Promise<*|null>}
 */
async function getPlayerDataById(playerId) {
    try {
        return await sendAxiosQuery('/api/get-player-data-by-id', {playerId: playerId});
    } catch (error) {
        console.error('Error fetching player data:', error);
        return null;
    }
}

/**
 *
 * function used to load the international competition standings
 * the home team will be highlighted in green, the away in yellow
 * @param groupedData an array of object containing data about the competition standings
 * @param container_id the id of the container on which append the data
 * @param home_club_id the id of the home team used to highlight its row on the table
 * @param away_club_id the id of the away team used to highlight its row on the table
 */
function loadInternationalCompetitionStandings(groupedData, container_id, home_club_id, away_club_id) {
    groupedData = groupBy(groupedData, 'round')
    const container = document.getElementById(container_id);
    container.innerHTML = ''; // Clear existing content

    Object.keys(groupedData).forEach(round => {
        const teams = groupedData[round];

        // Create a group header
        const groupHeader = document.createElement('h3');
        groupHeader.textContent = round;
        groupHeader.className = 'text-warning mt-4';
        container.appendChild(groupHeader);

        // Create a table for the group
        const table = document.createElement('table');
        table.className = 'table table-dark table-striped';

        // Create table header
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Position</th>
                <th>Team</th>
                <th>Played</th>
                <th>Goals</th>
                <th>Goal Difference</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Draws</th>
                <th>Points</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');

        // Add rows for each team in the group
        teams.forEach((team, index) => {
            const teamLogo = `https://tmssl.akamaized.net/images/wappen/head/${team.clubId}.png`; // Assuming clubId is home_club_id
            const row = `
                <tr id="team-row-${team.clubId}">
                    <td>${index+1}</td>
                    <td><img src="${teamLogo}" alt="Logo" style="width: 30px; height: 40px;"> ${team.name}</td>
                    <td>${team.matchesPlayed}</td>
                    <td>${team.goalsScored} : ${team.goalsTaken}</td>
                    <td>${team.goalDifference}</td>
                    <td>${team.wins}</td>
                    <td>${team.loss}</td>
                    <td>${team.drawn}</td>
                    <td>${team.points}</td>
                </tr>
            `;
            tbody.insertAdjacentHTML('beforeend', row);
        });

        table.appendChild(tbody);
        container.appendChild(table);
    });
    if (home_club_id){

        document.getElementById('team-row-' + home_club_id).className = 'table-success';
    }
    if (away_club_id){

        document.getElementById('team-row-' + away_club_id).className = 'table-warning';
    }
}

/**
 *
 * function used to load the standings the teams in the league of the current match
 * the home team will be highlighted in green, the away in yellow
 * @param standings an array of object containing data about the league standings
 * @param container_id the id of the container in which append the data
 * @param home_club_id the id of the home team used to highlight its row on the table
 * @param away_club_id the id of the away team used to highlight its row on the table
 */
function loadDomesticCompetitionStandings(standings, container_id, home_club_id,away_club_id) {
    const standingsTable = document.getElementById(container_id);


    standingsTable.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'table table-dark table-striped';
    // Create table header
    const thead = document.createElement('thead');
    thead.innerHTML = `
            <tr>
                <th>Position</th>
                <th>Team</th>
                <th>Played</th>
                <th>Goals</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Draws</th>
                <th>Points</th>
            </tr>
        `;
    table.appendChild(thead);
    const tbody = document.createElement('tbody');

    standings.forEach((team, index) => {

        const teamLogo = `https://tmssl.akamaized.net/images/wappen/head/${team.clubId}.png`;
        const row = `
            <tr id="team-row-${team.clubId}">
                <td>${team.position}</td>
                <td><img src="${teamLogo}" alt="Logo" style="width: 30px; height: 40px;"> ${team.name}</td>
                <td>${team.matchesPlayed}</td>
                <td>${team.goalsScored} : ${team.goalsTaken}</td>
                <td>${team.wins}</td>
                <td>${team.loss}</td>
                <td>${team.drawn}</td>
                <td>${team.points}</td>
            </tr>
        `;

        tbody.insertAdjacentHTML('beforeend', row);
        table.appendChild(tbody);
    });


    standingsTable.appendChild(table)
    if (home_club_id){

        document.getElementById('team-row-' + home_club_id).className = 'table-success';
    }
    if (away_club_id){

        document.getElementById('team-row-' + away_club_id).className = 'table-warning';
    }
}


/**
 * Function to group an array by one of its field
 * @param array the array to group
 * @param key the field on which you want to group by
 * @returns {*}
 */
function groupBy(array, key) {
    return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
    }, {});
}





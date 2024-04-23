document.addEventListener('DOMContentLoaded', function () {

    const urlParams = new URLSearchParams(window.location.search);
    const game_id = urlParams.get('game_id');
    const season = urlParams.get('season');
    const date = urlParams.get('date');
    const competition_id = urlParams.get('competition_id');
    const home_club_id = urlParams.get('home_club_id');
    const away_club_id = urlParams.get('away_club_id');


    sendAxiosQuery('/api/get-game-info', {game_id: game_id})
        .then(data => {

            loadGameInfo(data)
        })

    sendAxiosQuery('/api/get-all-game-events-by-game-id', {game_id: game_id})
        .then(game_events => {

            loadGameEvents(game_events);
        })

    sendAxiosQuery('/api/get-standings-up-to-round', {date:date, season:season, competition_id:competition_id})
        .then(standings =>{

            loadStandings(standings, home_club_id, away_club_id);
        })
});

/**
 * function used for displaying the game info on page
 * @param data the game data
 */
function loadGameInfo(data,) {

    document.getElementById("game-round-index").innerText += " " + data['round'];
    document.getElementById("home-team-index").innerText = data['home_club_name'];
    document.getElementById("away-team-index").innerText = data['away_club_name'];
    document.getElementById("game-score-index").innerText = data['aggregate']
    document.getElementById("home-team-image-index").src = "https://tmssl.akamaized.net/images/wappen/head/" + data['home_club_id'] + ".png"
    document.getElementById("away-team-image-index").src = "https://tmssl.akamaized.net/images/wappen/head/" + data['away_club_id'] + ".png"

    const dateString = data['date'];
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    document.getElementById('game-date-index').innerText += " " + date.toLocaleDateString('en-US', options)
    document.getElementById('competition-logo').src = 'https://tmssl.akamaized.net/images/logo/header/' + data.competition_id.toLowerCase() + '.png';

    getLineups(data);
}

/**
 * functio used to display the game lineups
 * @param data the game data
 */
function getLineups(data) {

    document.getElementById('home-team-lineup').innerText = data.home_club_formation;
    document.getElementById('away-team-lineup').innerText = data.away_club_formation;

    sendAxiosQuery('/api/get-game-lineup-by-id', {game_id: data.game_id})
        .then(lineup => {

            //group the lineup by the clubid
            const groupedData = lineup.reduce((acc, curr) => {
                const {clubId} = curr;
                // If the clubId doesn't exist in the Map, set it to an empty array
                if (!acc.has(clubId)) {
                    acc.set(clubId, []);
                }
                // Push the current object to the array associated with its clubId
                acc.get(clubId).push(curr);
                return acc;
            }, new Map());

            const home_team_lineups = groupedData.get(data.home_club_id);
            const away_team_lineups = groupedData.get(data.away_club_id);


            loadLineups('home', home_team_lineups);
            loadLineups('away', away_team_lineups);

        })
}

function loadLineups(team, players) {
    const startingTableBody = document.querySelector(`#${team}-team-table-starting tbody`);
    const substitutesTableBody = document.querySelector(`#${team}-team-table-substitutes tbody`);

    // Clear existing table rows
    startingTableBody.innerHTML = '';
    substitutesTableBody.innerHTML = '';

    // Iterate over the players and create table rows based on their type
    players.forEach(player => {

        const row = document.createElement('tr');
        row.innerHTML = `<td class="" >${player.playerName}</td>
                        <td class="text-secondary">${player.position}</td>
                        <td>${player.teamCaptain === 1 ? '<svg  xmlns="http://www.w3.org/2000/svg" ' +
            '                                                   width="16" ' +
            '                                                   height="16" ' +
            '                                                   fill="currentColor" ' +
            '                                                   class="bi bi-c-circle-fill" ' +
            '                                                   viewBox="0 0 16 16">\n' +
            '  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c.961 0 1.641.633 1.729 1.512h1.295v-.088c-.094-1.518-1.348-2.572-3.03-2.572-2.068 0-3.269 1.377-3.269 3.638v1.073c0 2.267 1.178 3.603 3.27 3.603 1.675 0 2.93-1.02 3.029-2.467v-.093H9.875c-.088.832-.75 1.418-1.729 1.418-1.224 0-1.927-.891-1.927-2.461v-1.06c0-1.583.715-2.503 1.927-2.503"/>\n' +
            '</svg>' : ''}</td>`;

        if (player.type === 'starting_lineup') {
            startingTableBody.appendChild(row);
        } else if (player.type === 'substitutes') {
            substitutesTableBody.appendChild(row);
        }
    });
}


function loadGameEvents(events) {
    const gameEventsDiv = document.getElementById('game-events');

    // Clear existing game events
    gameEventsDiv.innerHTML = '';

    // Iterate over each event and create a card for it
    for (const event of events) {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3', 'text-center', 'bg-success');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'fw-bold');

        // Customize event icon based on event type
        const icon = document.createElement('img');
        icon.src = getEventIcon(event.type); // Set icon image URL
        icon.classList.add('w-5');

        const eventDescription = document.createElement('p');
        eventDescription.textContent = `${event.minute}' - ${event.description}`;

        if (event.type === 'Substitutions') {

            const substitutionInfo = document.createElement('p');
            getPlayerName(event.player_in_id)
                .then(playerIn => {

                    substitutionInfo.textContent = 'IN: ' + playerIn.name + ', ';
                })
            getPlayerName(event.player_id)
                .then(playerOut => {

                    substitutionInfo.textContent += 'OUT: ' + playerOut.name;
                })


            cardBody.appendChild(substitutionInfo);
        } else {

            const event_info = document.createElement('p');
            getPlayerName(event.player_id)
                .then(player => {

                    event_info.textContent = `${player.name}'`;
                })

            cardBody.appendChild(event_info);
        }

        cardBody.appendChild(icon);
        cardBody.appendChild(eventDescription);
        card.appendChild(cardBody);

        gameEventsDiv.appendChild(card);
    }
}

async function getPlayerName(playerId) {
    try {
        return await sendAxiosQuery('/api/get-player-data-by-id', {playerId: playerId});
    } catch (error) {
        console.error('Error fetching player data:', error);
        return null;
    }
}

function getEventIcon(eventType) {
    let iconPath;
    switch (eventType) {
        case 'Substitutions':
            iconPath = '../images/substitution.png'; // Example icon for substitutions
            break;
        case 'Goals':
            iconPath = '../images/ball.png'; // Example icon for goals
            break;
        case 'Cards':
            iconPath = '../images/card.png'; // Example icon for cards
            break;
        default:
            iconPath = '../images/question.png'; // Default icon
            break;
    }
    return iconPath;
}

function loadStandings(standings, home_club_id,away_club_id) {
    const standingsTable = document.getElementById('standings-table');

    // Clear existing standings
    standingsTable.innerHTML = '';

    // Create table header
    const tableHeader = `
        <tr>
            <th>Position</th>
            <th>Team</th>
            <th>Played</th>
            <th>Goals Scored</th>
            <th>Goals Taken</th>
            <th>Goal Difference</th>
            <th>Points</th>
        </tr>
    `;
    standingsTable.insertAdjacentHTML('beforeend', tableHeader);

    // Iterate over each team in the standings and create a table row

    standings.forEach((team, index) => {
        const isEvenRow = index % 2 === 0;
        let home_team_row_color;
        let away_team_row_color;
        let currentTeamClass = '' // Add bg-warning class for current team
        if (team.clubId == home_club_id) currentTeamClass = 'bg-success'
        if (team.clubId == away_club_id) currentTeamClass = 'bg-warning'



        let rowClass = isEvenRow ? 'bg-light' : 'bg-white'; // Alternate stripe classes

        const row = `
            <tr class=" ${currentTeamClass} ">
                <td>${team.position}</td>
                <td>${team.name}</td>
                <td>${team.matchesPlayed}</td>
                <td>${team.goalsScored}</td>
                <td>${team.goalsTaken}</td>
                <td>${team.goalDifference}</td>
                <td>${team.points}</td>
            </tr>
        `;
        standingsTable.insertAdjacentHTML('beforeend', row);
    });
}


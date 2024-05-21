document.addEventListener('DOMContentLoaded', async function () {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const game_id = urlParams.get('game_id');
        const season = urlParams.get('season');
        const date = urlParams.get('date');
        const competition_id = urlParams.get('competition_id');
        const home_club_id = urlParams.get('home_club_id');
        const away_club_id = urlParams.get('away_club_id');

        // Load game info
        const gameInfo = await sendAxiosQuery('/api/get-game-info', {game_id});
        loadGameInfo(gameInfo);
        getLineups(gameInfo);

        // Load game events
        const gameEvents = await sendAxiosQuery('/api/get-all-game-events-by-game-id', {game_id});
        loadGameEvents(gameEvents);

        // Load standings
        const standings = await sendAxiosQuery('/api/get-standings-up-to-round', {
            date: date,
            season: season,
            competition_id: competition_id
        });

        loadStandings(standings, home_club_id, away_club_id);
        loadMinorData(gameInfo);

        const h2h_games = await sendAxiosQuery('/api/get-head-2-head-games', {
            home_club_id:home_club_id,
            away_club_id: away_club_id

        })
        console.log(h2h_games)
        displayH2HGames(h2h_games);

    } catch (error) {
        console.error('Failed to load game data:', error);
    }
});


/**
 * function used for displaying the game info on page
 * @param data the game data
 */
function loadGameInfo(data) {

    document.getElementById("game-round-index").innerText += " " + data['round'];
    document.getElementById("home-team-index").innerText = data['home_club_name'];
    document.getElementById('home-team-link').href = '/club/club-info?' +
        'club_id=' + data.home_club_id;
    document.getElementById('away-team-link').href = '/club/club-info?' +
        'club_id=' + data.away_club_id;
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

            loadLineups('home', home_team_lineups, data.home_club_id);
            loadLineups('away', away_team_lineups, data.away_club_id);

        })
}

/**
 * function used to load the lineups on the page
 * @param team identifies if it's the home or away team
 * @param players the players of the corresponding team
 * @team_id the id of either the home or away team
 */
function loadLineups(team, players, team_id) {
    const startingTableBody = document.querySelector(`#${team}-team-table-starting tbody`);
    const substitutesTableBody = document.querySelector(`#${team}-team-table-substitutes tbody`);

    // Clear existing table rows
    startingTableBody.innerHTML = '';
    substitutesTableBody.innerHTML = '';

    players.forEach(player => {

        const teamLogo = `https://tmssl.akamaized.net/images/wappen/head/${team_id}.png`;
        const row = document.createElement('tr');
        row.innerHTML = `<td class="text-dark" >
                            <a class="player-lineups-name-link text-dark link-underline-primary" href="/players/player-info?player_id=${player.playerId}">
                                <img src="${teamLogo}" alt="Logo" style="width: 30px; height: 40px;">
                                ${player.number} . ${player.playerName}
                            </a>
                         </td>
                        <td class="text-success">${getPositionInitials(player.position)}</td>
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

/**
 * function used to load the events of a game
 * @param events array of object containing all the game events
 */
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
            getPlayerDataById(event.player_in_id)
                .then(playerIn => {

                    substitutionInfo.textContent = 'IN: ' + playerIn.name + ', ';
                })
            getPlayerDataById(event.player_id)
                .then(playerOut => {

                    substitutionInfo.textContent += 'OUT: ' + playerOut.name;
                })


            cardBody.appendChild(substitutionInfo);
        } else {

            const event_info = document.createElement('p');
            getPlayerDataById(event.player_id)
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

/**
 *
 * function used to load the icon corresponding to an event
 * @param eventType the type of event in question
 * @returns {string} the src of the icon image
 */
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

/**
 *
 * function used to load the standings the teams in the league of the current match
 * the home team will be highlighted in green, the away in yellow
 * @param standings an array of object containing data about the league standings
 * @param home_club_id the id of the home team used to highlight its row on the table
 * @param away_club_id the id of the away team used to highlight its row on the table
 */
function loadStandings(standings, home_club_id,away_club_id) {
    const standingsTable = document.getElementById('standings-table-tbody');

    standingsTable.innerHTML = '';


    standings.forEach((team, index) => {
        const isEvenRow = index % 2 === 0;

        let currentTeamClass = '' // Add bg-warning class for current team
        if (team.clubId == home_club_id) currentTeamClass = 'bg-success'
        if (team.clubId == away_club_id) currentTeamClass = 'bg-warning'

        let rowClass = isEvenRow ? 'bg-light' : 'bg-white'; // Alternate stripe classes
        const teamLogo = `https://tmssl.akamaized.net/images/wappen/head/${team.clubId}.png`;
        const row = `
            <tr class="${currentTeamClass}">
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

        standingsTable.insertAdjacentHTML('beforeend', row);
    });
}

/**
 * function used to get the initials of the players position
 * I.E. Center-Back -> CB
 * @param position
 * @returns {string}
 */
function getPositionInitials(position) {

    if (position == 'Goalkeeper') return 'GK';
    // Replace hyphens with spaces and split the string into words
    let words = position.toString().replace('-', ' ').split(' ');
    // Get the first letter of each word and join them
    let initials = words.map(word => word[0].toUpperCase()).join('');
    return initials;
}

/**
 * function used to load the least important data
 * like the manager names, the stadium, the referee name and the competition type
 * @param data the data of the game
 */
function loadMinorData(data) {
    // Set text for each part, being careful not to disturb the image tags
    // Using querySelector to target specific spans for text injection
    document.querySelector('#referee-name span').textContent = `Referee: ${data.referee}`;
    document.querySelector('#home-manager-name span').textContent = `Home Manager: ${data.home_club_manager_name}`;
    document.querySelector('#away-manager-name span').textContent = `Away Manager: ${data.away_club_manager_name}`;
    document.querySelector('#stadium-name span').textContent = `Stadium: ${data.stadium}`;
}

/**
 * function for loading the head-to-head games card
 * @param groupedGames all the games grouped by the season they were played in
 */
function displayH2HGames(groupedGames) {
    const container = document.querySelector('.head-to-head');
    container.innerHTML = ''; // Clear previous content if necessary

    // Iterate over each property in the groupedGames object
    Object.keys(groupedGames).forEach((season, index, array) => {
        const seasonHeader = document.createElement('h3');
        seasonHeader.textContent = `${season}`;
        seasonHeader.classList.add('text-light','text-center')
        container.appendChild(seasonHeader);

        const rowDiv = document.createElement('div');
        rowDiv.className = 'row'; // Bootstrap row for card layout

        // Iterate over each game in the season array
        groupedGames[season].forEach(game => {
            const card = createGameCard(game);
            rowDiv.appendChild(card);
        });

        container.appendChild(rowDiv);

        // Add an <hr> unless it's the last season group
        if (index !== array.length - 1) {
            const hr = document.createElement('hr');
            container.appendChild(hr);
        }
    });
}



/**
 * function used for dynamically creating the cards for the head 2 head section
 * @param game the  game data
 * @returns {HTMLDivElement} the card
 */
function createGameCard(game) {
    let home_team_logo = `https://tmssl.akamaized.net/images/wappen/head/${game.home_club_id}.png`;
    let away_team_logo = `https://tmssl.akamaized.net/images/wappen/head/${game.away_club_id}.png`;

    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-4 mb-4';

    const card = document.createElement('div');
    card.className = 'card h-100 bg-secondary text-light';

    const gameDate = new Date(game.date).toLocaleDateString('en-GB'); // Formatting date for display

    const link = document.createElement('a');
    link.href = `/games/game-info?game_id=${game.game_id}&date=${game.date}&season=${game.season}&competition_id=${game.competition_id}&home_club_id=${game.home_club_id}&away_club_id=${game.away_club_id}`;
    link.innerHTML = `
        <div class="card-body">
            <h5 class="card-title fw-bold">${game.round}</h5>
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="text-center">
                    <h6>${game.home_club_name}</h6>
                    <img src="${home_team_logo}" alt="Home Team Logo" class="img-fluid" style="max-width: 50px;">
                </div>
                <div>
                    <h2>${game.score || game.aggregate}</h2>
                </div>
                <div class="text-center">
                    <h6>${game.away_club_name}</h6>
                    <img src="${away_team_logo}" alt="Away Team Logo" class="img-fluid" style="max-width: 50px;">
                </div>
            </div>
            <p class="card-text">Match played on: ${gameDate}</p>
        </div>
    `;

    card.appendChild(link);
    colDiv.appendChild(card);

    return colDiv;
}



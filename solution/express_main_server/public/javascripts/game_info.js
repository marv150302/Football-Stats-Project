document.addEventListener('DOMContentLoaded', async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const game_id = urlParams.get('game_id');
        const season = urlParams.get('season');
        const date = urlParams.get('date');
        const competition_id = urlParams.get('competition_id');
        const home_club_id = urlParams.get('home_club_id');
        const away_club_id = urlParams.get('away_club_id');

        document.getElementById('forum-button').href = `/forum?type=game&id=${game_id}`;

        // Fetch competition data
        let competition = await sendAxiosQuery('/api/get-competition-by-id', { competition_id });
        competition = competition[0];

        // Load game info
        const gameInfo = await sendAxiosQuery('/api/get-game-info', { game_id });
        loadGameInfo(gameInfo);
        getLineups(gameInfo);

        // Load game events
        const gameEvents = await sendAxiosQuery('/api/get-all-game-events-by-game-id', { game_id });
        loadGameEvents(gameEvents);

        if (!competition.subType.includes('qualif') || !competition.subType.includes('cup')) {
            // Load standings
            const standings = await sendAxiosQuery('/api/get-standings-up-to-round', {
                date,
                season,
                competition_id
            });

            if (competition.type.includes('domestic')) {
                loadDomesticCompetitionStandings(standings, 'standings-container', home_club_id, away_club_id);
            } else {
                // If it's an international competition
                loadInternationalCompetitionStandings(standings, 'standings-container', home_club_id, away_club_id);
            }
        }

        loadMinorData(gameInfo);

        // Load head-to-head games
        const h2h_games = await sendAxiosQuery('/api/get-head-2-head-games', {
            home_club_id,
            away_club_id
        });
        displayH2HGames(h2h_games);

    } catch (error) {
        console.error('Failed to load game data:', error);
    }
});

/**
 * Function to display game info on the page
 * @param {Object} data - The game data
 */
function loadGameInfo(data) {
    document.getElementById("game-round-index").innerText += ` ${data.round}`;
    document.getElementById("home-team-index").innerText = data.home_club_name;
    document.getElementById('home-team-link').href = `/club/club-info?club_id=${data.home_club_id}`;
    document.getElementById('away-team-link').href = `/club/club-info?club_id=${data.away_club_id}`;
    document.getElementById("away-team-index").innerText = data.away_club_name;
    document.getElementById("game-score-index").innerText = data.aggregate;
    document.getElementById("home-team-image-index").src = `https://tmssl.akamaized.net/images/wappen/head/${data.home_club_id}.png`;
    document.getElementById("away-team-image-index").src = `https://tmssl.akamaized.net/images/wappen/head/${data.away_club_id}.png`;

    const date = new Date(data.date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('game-date-index').innerText += ` ${date.toLocaleDateString('en-US', options)}`;
    document.getElementById('competition-logo').src = `https://tmssl.akamaized.net/images/logo/header/${data.competition_id.toLowerCase()}.png`;
    document.getElementById('competition-link').href = `/competitions/competition-info?competition_id=${data.competition_id}`;
}

/**
 * Function to display game lineups
 * @param {Object} data - The game data
 */
function getLineups(data) {
    document.getElementById('home-team-lineup').innerText = data.home_club_formation;
    document.getElementById('away-team-lineup').innerText = data.away_club_formation;

    sendAxiosQuery('/api/get-game-lineup-by-id', { game_id: data.game_id })
        .then(lineup => {
            // Group the lineup by clubId
            const groupedData = lineup.reduce((acc, curr) => {
                const { clubId } = curr;
                if (!acc.has(clubId)) acc.set(clubId, []);
                acc.get(clubId).push(curr);
                return acc;
            }, new Map());

            const home_team_lineups = groupedData.get(data.home_club_id);
            const away_team_lineups = groupedData.get(data.away_club_id);

            loadLineups('home', home_team_lineups, data.home_club_id);
            loadLineups('away', away_team_lineups, data.away_club_id);
        });
}

/**
 * Function to load lineups on the page
 * @param {string} team - Identifies if it's the home or away team
 * @param {Array} players - The players of the corresponding team
 * @param {string} team_id - The ID of either the home or away team
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
        row.innerHTML = `
            <td class="text-dark">
                <a class="player-lineups-name-link text-dark link-underline-primary" href="/players/player-info?player_id=${player.playerId}">
                    <img src="${teamLogo}" alt="Logo" style="width: 30px; height: 40px;">
                    ${player.number} . ${player.playerName}
                </a>
            </td>
            <td class="text-success">${getPositionInitials(player.position)}</td>
            <td>${player.teamCaptain === 1 ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-c-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c.961 0 1.641.633 1.729 1.512h1.295v-.088c-.094-1.518-1.348-2.572-3.03-2.572-2.068 0-3.269 1.377-3.269 3.638v1.073c0 2.267 1.178 3.603 3.27 3.603 1.675 0 2.93-1.02 3.029-2.467v-.093H9.875c-.088.832-.75 1.418-1.729 1.418-1.224 0-1.927-.891-1.927-2.461v-1.06c0-1.583.715-2.503 1.927-2.503"/></svg>' : ''}</td>
        `;

        if (player.type === 'starting_lineup') {
            startingTableBody.appendChild(row);
        } else if (player.type === 'substitutes') {
            substitutesTableBody.appendChild(row);
        }
    });
}

/**
 * Function to load game events
 * @param {Array} events - Array of objects containing all the game events
 */
function loadGameEvents(events) {
    const gameEventsDiv = document.getElementById('game-events');

    // Clear existing game events
    gameEventsDiv.innerHTML = '';

    // Iterate over each event and create a card for it
    events.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3', 'text-center', 'bg-dark');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'fw-bold');

        // Customize event icon based on event type
        const icon = document.createElement('img');
        icon.src = getEventIcon(event.type);
        icon.classList.add('w-5');

        const eventDescription = document.createElement('p');
        eventDescription.className = 'text-light';
        eventDescription.textContent = `${event.minute}' - ${event.description}`;

        if (event.type === 'Substitutions') {
            const substitutionInfo = document.createElement('p');

            getPlayerDataById(event.player_in_id).then(playerIn => {
                const sub_in = document.createElement('p');
                sub_in.className = 'text-success';
                sub_in.innerHTML = `<a class="text-success" href="/players/player-info?player_id=${playerIn.playerId}">⬆: <img class="img-thumbnail" style="width: 50px; height: 60px;" src="${playerIn.imageUrl}" alt="${playerIn.name}'s image"> ${playerIn.name}</a>`;
                substitutionInfo.appendChild(sub_in);
            });

            getPlayerDataById(event.player_id).then(playerOut => {
                const sub_out = document.createElement('p');
                sub_out.innerHTML = `<a class="text-danger" href="/players/player-info?player_id=${playerOut.playerId}">⬇: <img class="img-thumbnail" style="width: 50px; height: 60px;" src="${playerOut.imageUrl}" alt="${playerOut.name}'s image"> ${playerOut.name}</a>`;
                substitutionInfo.appendChild(sub_out);
            });

            cardBody.appendChild(substitutionInfo);
        } else {
            const event_info = document.createElement('h4');
            event_info.className = 'text-light card-title';

            getPlayerDataById(event.player_id).then(player => {
                event_info.innerHTML = `<a href="/players/player-info?player_id=${player.playerId}"><img class="img-thumbnail" style="width: 50px; height: 60px;" src="${player.imageUrl}" alt="${player.name}'s image"> ${player.name}</a>`;
            });

            cardBody.appendChild(event_info);
        }

        cardBody.appendChild(icon);
        cardBody.appendChild(eventDescription);
        card.appendChild(cardBody);
        gameEventsDiv.appendChild(card);
    });
}

/**
 * Function to load the icon corresponding to an event
 * @param {string} eventType - The type of event in question
 * @returns {string} - The src of the icon image
 */
function getEventIcon(eventType) {
    switch (eventType) {
        case 'Substitutions':
            return ''; // Example icon for substitutions
        case 'Goals':
            return '../images/ball.png'; // Example icon for goals
        case 'Cards':
            return '../images/card.png'; // Example icon for cards
        default:
            return '../images/question.png'; // Default icon
    }
}

/**
 * Function to get the initials of the player's position
 * E.g., Center-Back -> CB
 * @param {string} position - The position of the player
 * @returns {string} - The initials of the position
 */
function getPositionInitials(position) {
    if (position === 'Goalkeeper') return 'GK';
    return position.replace('-', ' ').split(' ').map(word => word[0].toUpperCase()).join('');
}

/**
 * Function to load the least important data
 * Like the manager names, the stadium, the referee name and the competition type
 * @param {Object} data - The data of the game
 */
function loadMinorData(data) {
    document.querySelector('#referee-name span').textContent = `Referee: ${data.referee}`;
    document.querySelector('#home-manager-name span').textContent = `Home Manager: ${data.home_club_manager_name}`;
    document.querySelector('#away-manager-name span').textContent = `Away Manager: ${data.away_club_manager_name}`;
    document.querySelector('#stadium-name span').textContent = `Stadium: ${data.stadium}`;
}

/**
 * Function for loading the head-to-head games card
 * @param {Object} groupedGames - All the games grouped by the season they were played in
 */
function displayH2HGames(groupedGames) {
    const container = document.querySelector('.head-to-head');
    container.innerHTML = ''; // Clear previous content if necessary

    Object.keys(groupedGames).forEach((season, index, array) => {
        const seasonHeader = document.createElement('h3');
        seasonHeader.textContent = season;
        seasonHeader.classList.add('text-light', 'text-center');
        container.appendChild(seasonHeader);

        const rowDiv = document.createElement('div');
        rowDiv.className = 'row'; // Bootstrap row for card layout

        groupedGames[season].forEach(game => {
            const card = createGameCard(game);
            rowDiv.appendChild(card);
        });

        container.appendChild(rowDiv);

        if (index !== array.length - 1) {
            const hr = document.createElement('hr');
            container.appendChild(hr);
        }
    });
}



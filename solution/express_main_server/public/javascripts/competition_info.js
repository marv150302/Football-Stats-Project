document.addEventListener('DOMContentLoaded', async () => {

    const urlParams = new URLSearchParams(window.location.search);
    const competition_id = urlParams.get('competition_id');
    const season = 2023;

    document.getElementById('competition-logo').src = "https://tmssl.akamaized.net/images/logo/header/" + competition_id.toLowerCase() + '.png';

    const standings = await sendAxiosQuery('/api/get-standings-up-to-round', {
        competition_id: competition_id,
        season: season
    });

    //loadStandings(standings);
    loadGroupStandings(standings)

    const games = await sendAxiosQuery('/api/get-all-games-by-competition-and-year', {competition_id:competition_id, year:season})
    games.sort((a, b) => {
        const lastMatchADate = new Date(a.games[a.games.length - 1].date);
        const lastMatchBDate = new Date(b.games[b.games.length - 1].date);
        return lastMatchBDate - lastMatchADate;
    });
    console.log(games)

    displayGamesByMatchday(games, competition_id);
});


/**
 *
 * function used to load the standings the teams in the league of the current match
 * the home team will be highlighted in green, the away in yellow
 * @param standings an array of object containing data about the league standings
 */
function loadGroupStandings(groupStandings) {
    console.log(groupStandings)
    const container = document.getElementById('group-standings-container');
    container.innerHTML = ''; // Clear any existing content

    // Iterate over each group in the standings data
    groupStandings.forEach(group => {
        const groupName = group._id; // The group name (e.g., "Group C")
        const games = group.games; // The games within the group

        // Create a table for each group
        const table = document.createElement('table');
        table.className = 'table table-striped';

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

        // Add rows for each game in the group
        games.forEach((game, index) => {
            const isEvenRow = index % 2 === 0;
            let rowClass = isEvenRow ? 'bg-light' : 'bg-white'; // Alternate stripe classes
            const teamLogo = `https://tmssl.akamaized.net/images/wappen/head/${game.home_club_id}.png`; // Assuming clubId is home_club_id
            const row = `
                <tr class="${rowClass}">
                    <td>${index + 1}</td> <!-- Assuming index + 1 as the position -->
                    <td><img src="${teamLogo}" alt="Logo" style="width: 30px; height: 40px;"> ${game.home_club_name}</td>
                    <td>${game.home_club_goals + game.away_club_goals}</td>
                    <td>${game.home_club_goals} : ${game.away_club_goals}</td>
                    <td>${game.home_club_goals > game.away_club_goals ? 1 : 0}</td> <!-- Wins -->
                    <td>${game.home_club_goals < game.away_club_goals ? 1 : 0}</td> <!-- Losses -->
                    <td>${game.home_club_goals === game.away_club_goals ? 1 : 0}</td> <!-- Draws -->
                    <td>${game.home_club_goals > game.away_club_goals ? 3 : game.home_club_goals === game.away_club_goals ? 1 : 0}</td> <!-- Points -->
                </tr>
            `;
            tbody.insertAdjacentHTML('beforeend', row);
        });

        table.appendChild(tbody);

        // Add a group header
        const groupHeader = document.createElement('h3');
        groupHeader.textContent = `Group ${groupName}`;
        groupHeader.className = 'mt-4';

        // Append group header and table to the container
        container.appendChild(groupHeader);
        container.appendChild(table);
    });
}







/**
 *
 * function used to display and hide the divs
 * @param divId
 */
function toggleDiv(divId) {
    // Hide all divs
    document.querySelectorAll('.collapse').forEach(div => {
        div.classList.remove('show');
    });
    // Show the selected div
    document.getElementById(divId).classList.add('show');

    // Remove 'active' class from all buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.remove('active');
    });
    // Add 'active' class to the clicked button
    document.getElementById(`btn-${divId}`).classList.add('active');
}


/**
 *
 * function used to display the games of a competition
 * @param groupedGames all games grouped by matchday
 */
function displayGamesByMatchday(groupedGames) {

    const container = document.getElementById('games-container');

    groupedGames.forEach(group => {

        const matchdayRow = document.createElement('div');
        matchdayRow.className = 'row align-items-stretch mt-4';

        const matchdayHeader = document.createElement('h4');
        matchdayHeader.className = 'mb-3 text-warning fw-bold';
        matchdayHeader.textContent = `${group._id}`;
        matchdayRow.appendChild(matchdayHeader);

        group.games.forEach(game => {
            const col = document.createElement('div');
            col.className = 'col-md-3 mb-3';

            const card = document.createElement('div');
            card.className = 'card h-100 bg-dark text-light';

            const homeTeamLogo = `https://tmssl.akamaized.net/images/wappen/head/${game.home_club_id}.png`;
            const awayTeamLogo = `https://tmssl.akamaized.net/images/wappen/head/${game.away_club_id}.png`;

            const game_link = '/games/game-info?game_id=' + game.game_id
                + '&date=' + game.date
                + '&season=' + game.season
                + '&competition_id=' + game.competition_id
                + '&home_club_id=' + game.home_club_id
                + '&away_club_id=' + game.away_club_id;

            card.innerHTML = `
                <a href='${game_link}'>
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="text-center">
                                <h6>${game.home_club_name}</h6>
                                <img src="${homeTeamLogo}" alt="Home Team Logo" class="img-fluid" style="max-width: 50px;">
                            </div>
                            <div>
                                <h2>${game.aggregate}</h2>
                            </div>
                            <div class="text-center">
                                <h6>${game.away_club_name}</h6>
                                <img src="${awayTeamLogo}" alt="Away Team Logo" class="img-fluid" style="max-width: 50px;">
                            </div>
                        </div>
                        <p class="card-text">Match played on: ${new Date(game.date).toLocaleDateString()}</p>
                    </div>
                </a>
            `;

            col.appendChild(card);
            matchdayRow.appendChild(col);
        });

        // Append the row to the container
        container.appendChild(matchdayRow);
    });
}
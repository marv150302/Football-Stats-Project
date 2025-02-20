/**
 *
 * NOTE:
 *  THIS CODE WAS NOT USED ANYMORE IN THE PROJECT
 *  AS I WAS ABLE TO IMPLEMENT A MORE EFFICIENT WAY TO QUERY THE GAMES
 */

document.addEventListener('DOMContentLoaded', function () {

    getLastFourGamesByCompetition();
});

/**
 *
 * function used to get the last 4 games of each of the competitions present
 */
function getLastFourGamesByCompetition() {
    sendAxiosQuery('/api/get-all-competitions')
        .then(response => {
            // Assuming this is an array of competition objects with id and name
            response.forEach((competition, index, array) => {
                sendAxiosQuery('/api/get-last-four-games-by-competition-and-year', {
                    competition_id: competition.competitionId,
                    year: '2023'
                })
                    .then(gamesResponse => {

                        loadCompetitionsGames(competition, gamesResponse, index, array);
                    })
                    .catch(error => {
                        console.error('Error fetching games for competition ID', competition.competitionId, ':', error);
                    });
            });
        })
        .catch(error => {
            console.error('Error fetching competitions:', error);
        });
}

/**
 * function used to load the data dynamically onto the html page
 * @param competition the competition
 * @param gamesResponse the games of the competition
 * @param index the index in the array of competitions
 * @param array the array of competitions
 */
function loadCompetitionsGames(competition, gamesResponse, index, array) {

    // Create a row for the competition
    const competitionRow = document.createElement('div');
    competitionRow.className = 'row align-items-stretch mt-4';

    // Create a header for the competition name
    const competitionHeader = document.createElement('h4');
    competitionHeader.className = competition.name + ' mb-3 text-warning fw-bold';
    competition.name = competition.name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const link = document.createElement('a');
    link.setAttribute('href', '/competition-games?competitionId=' + competition.competitionId + '&year=2023'); // Modify the href accordingly
    link.textContent = competition.name;
    link.style.color = 'inherit'; // Ensures the link uses the header's text color
    link.style.textDecoration = 'none'; // Optional: removes underline from link

    competitionHeader.appendChild(link);
    competitionRow.appendChild(competitionHeader);

    gamesResponse.forEach(game => {
        const col = document.createElement('div');
        col.className = 'col-md-3 mb-3';

        const card = document.createElement('div');
        card.className = 'card h-100 bg-dark text-light';

        let home_team_logo = "https://tmssl.akamaized.net/images/wappen/head/" + game['home_club_id'] + ".png";
        let away_team_logo = "https://tmssl.akamaized.net/images/wappen/head/" + game['away_club_id'] + ".png";
        const game_link = '/games/game-info?game_id=' + game.game_id
            + '&date=' + game.date
            + '&season=' + game.season
            + '&competition_id=' + game.competition_id
            + '&home_club_id=' + game.home_club_id
            + '&away_club_id=' + game.away_club_id;

        card.innerHTML = `
                        <a href='${game_link}'>
                            <div class="card-body">
                                <h5 class="card-title fw-bold">Round: ${game.round}</h5>
                                <div class="row d-flex justify-content-between align-items-center mb-3">
                                    <div class="col-md-4 text-center">
                                        <h6>${game['home_club_name']}</h6>
                                        <img src="${home_team_logo}" alt="Home Team Logo" class="img-fluid" style="max-width: 50px;">
                                    </div>
                                    <div class="col-md-4 text-center">
                                        <h2>${game['aggregate']}</h2>
                                    </div>
                                    <div class="col-md-4 text-center">
                                        <h6>${game['away_club_name']}</h6>
                                        <img src="${away_team_logo}" alt="Away Team Logo" class="img-fluid" style="max-width: 50px;">
                                    </div>
                                </div>
                                <p class="card-text">Match played on: ${new Date(game.date).toLocaleDateString()}</p>
                            </div>
                        </a>
                    `;
        col.appendChild(card);
        competitionRow.appendChild(col);
    });

    // Append the row to the container
    const competitionsContainer = document.getElementById('competitions-container');
    competitionsContainer.appendChild(competitionRow);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'mt-2 mb-2';
    buttonContainer.id = "data-button-index" + (index);

    const viewButton = document.createElement('button');
    viewButton.className = 'btn btn-warning btn-lg w-50 d-inline-block mt-auto';
    viewButton.textContent = 'See More →';
    viewButton.onclick = function () {
        window.location.href = '/competition-games?competitionId=' + competition.competitionId + '&year=2023';
    };

    buttonContainer.appendChild(viewButton);
    competitionRow.appendChild(buttonContainer);

    // Add a <br> element after each row except for the last one
    if (index < array.length - 1) {
        const hr = document.createElement('hr');
        hr.id = "data-row-index" + (index);
        competitionRow.appendChild(hr);
    }
}


let debounceTimer;
document.getElementById('competitionFilter').addEventListener('input', function (event) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        filterCompetitions(event.target.value.toLowerCase());
    }, 300); // Adjust the delay time (in milliseconds) as needed
});

/**
 *
 * Function used to filter the competitions as the user types
 */
function filterCompetitions(input) {
    let container = document.getElementById('competitions-container');
    let competitionRows = container.getElementsByClassName('row');

    for (let i = 0; i < competitionRows.length; i++) {
        let title = competitionRows[i].getElementsByTagName('h4')[0];
        if (title) {
            let name = title.textContent || title.innerText;
            let shouldDisplay = name.toLowerCase().includes(input);
            competitionRows[i].style.display = shouldDisplay ? "" : "none";
            // hide/show the <hr> element based on filtering result
            document.getElementById("data-row-index" + (i)).style.display = shouldDisplay ? "" : "none";
            // hide/show the buttons based on filtering result
            document.getElementById("data-button-index" + (i)).style.display = shouldDisplay ? "" : "none";
        }
    }
}




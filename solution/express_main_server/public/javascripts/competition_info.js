document.addEventListener('DOMContentLoaded', async () => {

    const urlParams = new URLSearchParams(window.location.search);
    const competition_id = urlParams.get('competition_id');
    const season = 2023;

    document.getElementById('forum-button').href = "/forum?type=competition&id=" + competition_id

    let competition = await sendAxiosQuery('/api/get-competition-by-id', {competition_id:competition_id});
    competition = competition[0];


    document.getElementById('competition-logo').src = "https://tmssl.akamaized.net/images/logo/header/" + competition_id.toLowerCase() + '.png';

    const games = await sendAxiosQuery('/api/get-all-games-by-competition-and-year', {competition_id:competition_id, season:season})
    /**
     * if among the competition games there are group games -> it's an international competition with group games -> we display the groups standing
     * if the competition type is a domestic league we display the usual standings
     * otherwise we simply display the matches and the scorers of the competition
     * we hide the standings
     *
     */
    if (games.some(game => game._id.includes('Group'))){


        const standings = await sendAxiosQuery('/api/get-standings-up-to-round', {
            competition_id: competition_id,
            season: season
        });

        /**
         * if it's an international competition
         */
        loadInternationalCompetitionStandings(standings,'standings-container')

    }else if(competition.type == "domestic_league"){

        const standings = await sendAxiosQuery('/api/get-standings-up-to-round', {
            competition_id: competition_id,
            season: season
        });
        /**
         * if it's a domestic competition
         */
        loadDomesticCompetitionStandings(standings, 'standings-container');
    }
    else{

        toggleDiv('div2') //we show the second div, the one with the games
        document.getElementById('btn-div1').style.display = 'none'; //we hide the button that displays the div with the standings
        document.getElementById('div1').style.display = 'none';// we hide the first div that displays the games
    }



    games.sort((a, b) => {
        const lastMatchADate = new Date(a.games[a.games.length - 1].date);
        const lastMatchBDate = new Date(b.games[b.games.length - 1].date);
        return lastMatchBDate - lastMatchADate;
    });

    displayGamesByMatchday(games, competition_id);

    const top_scorers = await  sendAxiosQuery('/api/get-top-scorer-by-competition-and-year', {competition_id: competition_id.toUpperCase(), year:season})
    loadLeagueTopScorers(top_scorers, 'top-scorers')
});


/**
 *
 * function used to display and hide the divs
 * @param divId the id of the div
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
            col.className = 'col-md-6 mb-3';

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


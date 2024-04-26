
window.addEventListener('load', function() {

    const urlParams = new URLSearchParams(window.location.search);
    const competitionId = urlParams.get('competitionId');
    const year = urlParams.get('year');
    sendAxiosQuery('/api/get-all-games-by-competition-and-year', {competition_id:competitionId, year:year})
        .then(data =>{

            /**
             * order the games by date
             */
            data.sort((a, b) => {
                const lastMatchADate = new Date(a.games[a.games.length - 1].date);
                const lastMatchBDate = new Date(b.games[b.games.length - 1].date);
                return lastMatchBDate - lastMatchADate;
            });

            displayGamesByMatchday(data, competitionId, year)
        })

});


function displayGamesByMatchday(groupedGames, competitionId, year) {

    const container = document.getElementById('competitions-container');

    document.getElementById("competition-logo").src = 'https://tmssl.akamaized.net/images/logo/header/' + competitionId.toLowerCase() + '.png';

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


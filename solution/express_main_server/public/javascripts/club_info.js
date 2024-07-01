document.addEventListener('DOMContentLoaded', async function () {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        //const season = urlParams.get('season');
        //const date = urlParams.get('date');
        const club_id = urlParams.get('club_id');

        document.getElementById('forum-button').href = "/forum?type=club&id=" + club_id

        const main_info = await sendAxiosQuery('/api/get-club-data-by-id', {club_id: club_id})
        loadClubMainData(main_info[0]);

        const last_game = await sendAxiosQuery('/api/get-club-last-game', {club_id: club_id});
        loadLastGame(last_game, club_id);

        // Load standings
        const standings = await sendAxiosQuery('/api/get-standings-up-to-round', {
            /*date: date,*/
            season: main_info[0].lastSeason,
            competition_id: main_info[0].domesticCompetitionId
        });

        loadStandings(standings, club_id, main_info[0].domesticCompetitionId);

        const club_players = await sendAxiosQuery('/api/get-club-players', {club_id: club_id})
        loadPlayerList(club_players);


    } catch (error) {
        console.error('Failed to load club data:', error);
    }
});


/**
 * function to load main data about the club
 * @param data the club data
 */
function loadClubMainData(data) {

    let team_logo = "https://tmssl.akamaized.net/images/wappen/head/" + data.clubId + ".png";
    document.getElementById('club-name').innerText = data.name;
    document.getElementById('club-logo').src = team_logo
    //document.getElementById('squad-size').innerText = data.squadSize;
    document.getElementById('coach-name').innerText = data.coachName;
    document.getElementById('foreign-player-number').innerText = data.foreignersNumber;
    document.getElementById('average-age').innerHTML = data.averageAge;
    document.getElementById('stadium-name').innerText = data.stadiumName
    document.getElementById('stadium-size').innerHTML = data.stadiumSeats
    document.getElementById('national-player-number').innerHTML = data.foreignersNumber;
}


/**
 *
 * function used to load the standings the teams in the league of the current match
 * the club will be highlighted in green
 * @param standings an array of object containing data about the league standings
 * @param club_id the id of the  team used to highlight its row on the table
 * @param competitionId the id of the competition of which we want to display the table
 */
function loadStandings(standings, club_id, competitionId) {
    const standingsTable = document.getElementById('standings-table-tbody');

    //document.getElementById('competition-link').href = "/competition-games?competitionId=" + competitionId+ "&year=2023"
    document.getElementById('domestic-competition-logo').src = 'https://tmssl.akamaized.net/images/logo/header/' + competitionId.toLowerCase() + '.png';
    document.getElementById('competition-link').href = '/competitions/competition-info?competition_id=' + competitionId;
    document.getElementById('standings-link').href = '/competitions/competition-info?competition_id=' + competitionId;

    standingsTable.innerHTML = '';

    // Find the index of the current team in the standings array
    const currentIndex = standings.findIndex(team => team.clubId == club_id);

    if (currentIndex !== -1) {
        // Filter the standings array to include the current team and the teams directly above and below it
        const filteredStandings = standings.slice(Math.max(0, currentIndex - 1), Math.min(currentIndex + 2, standings.length));

        filteredStandings.forEach((team, index) => {
            const isEvenRow = index % 2 === 0;

            let currentTeamClass = ''; // Add bg-success class for current team
            if (team.clubId == club_id) currentTeamClass = 'bg-success';

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
    } else {
        console.error('Current team not found in standings');
    }
}

/**
 *
 * Function to calculate the age of the player
 * @param dateOfBirth the date of birth of the player
 * @returns {number}
 */
function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/**
 *
 * Function to dynamically create player table row
 * @param player the player object
 * @returns {string}
 */
function createPlayerRow(player) {
    const age = calculateAge(player.dateOfBirth);
    return `
        <tr>
            <td><img src="${player.imageUrl}" alt="${player.name}" class="img-thumbnail" style="max-width: 50px; max-height: 50px;"></td>
            <td><a href="/players/player-info?player_id=${player.playerId}">${player.name}</a></td>
            <td>${player.position}</td>
            <td>${player.countryOfBirth}</td>
            <td>${age}</td>
        </tr>
        `;
}

/**
 *
 * Function to populate the player list
 * @param players the list of player object
 */
function loadPlayerList(players) {
    const playerListContainer = document.getElementById('player-list');
    const playerRows = players.map(player => createPlayerRow(player));
    playerListContainer.innerHTML = playerRows.join('');
    document.getElementById('player-heading').innerText = `Players`;
}


/**
 * Function to load the club's last game
 * @param game the object containing the data about the game
 * @param current_club_id the id of the club you're actually visioning
 */
function loadLastGame(game, current_club_id) {

    let home_team_logo = "https://tmssl.akamaized.net/images/wappen/head/" + game.home_club_id + ".png";
    let away_team_logo = "https://tmssl.akamaized.net/images/wappen/head/" + game.away_club_id + ".png";

    document.getElementById('last-game-link').href = '/games/game-info?game_id=' + game.game_id
        + '&date=' + game.date
        + '&season=' + game.season
        + '&competition_id=' + game.competition_id
        + '&home_club_id=' + game.home_club_id
        + '&away_club_id=' + game.away_club_id;

    document.getElementById('home-team-logo').src = home_team_logo;
    document.getElementById('home-team-name').innerHTML = game.home_club_name;
    //document.getElementById('home-team-score').innerHTML = game.home_club_goals;

    document.getElementById('away-team-logo').src = away_team_logo;
    document.getElementById('away-team-name').innerHTML = game.away_club_name;
    //document.getElementById('away-team-score').innerHTML = game.away_club_goals;
    document.getElementById('last-game-stadium-name').innerHTML = 'Stadium: ' + game.stadium;


    document.getElementById('score').innerHTML = game.aggregate;
    /**
     * ----------------TEMPORARY SOLUTION----------------
     * this is done because the data in the csv is inconsistent and
     * all the coaches name have null value,
     * hence why I use the club's last match to get info about the coach name
     */
    if (current_club_id == game.home_club_id) {

        document.getElementById('coach-name').innerHTML = game.home_club_manager_name
    } else {

        document.getElementById('coach-name').innerHTML = game.away_club_manager_name
    }

}
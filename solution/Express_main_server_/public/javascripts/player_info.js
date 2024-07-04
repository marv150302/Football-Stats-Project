document.addEventListener('DOMContentLoaded', async function () {

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const player_id = urlParams.get('player_id');

        document.getElementById('stats-button').style.display = "block"
        document.getElementById('stats-link').href = "/stats?type=player&id=" + player_id

        // Fetch and load player data
        const playerData = await sendAxiosQuery('/api/get-player-data-by-id', { playerId: player_id });
        loadPlayerBasicInfo(playerData);
        document.getElementById('forum-button').href = `/forum?type=player&id=${player_id}&url=${playerData.imageUrl}`;

        // Fetch and load player main stats
        const playerMainStats = await sendAxiosQuery('/api/get-player-basic-data-by-id-and-season', { player_id: player_id, season: 2023 });
        loadMainStats(playerMainStats);

        // Fetch and load player club history
        const playerClubHistory = await sendAxiosQuery('/api/get-player-club-history', { player_id: player_id });
        insertClubsIntoTable(playerClubHistory);

    } catch (error) {
        console.error('Failed to load player data:', error);
    }
});

/**
 * Function used to load the player's basic info
 * @param {Object} data - The data about the player
 */
function loadPlayerBasicInfo(data) {
    document.getElementById('player-image').src = data.imageUrl;
    document.getElementById('player-name').innerText = data.name;
    document.getElementById('age').innerText = calculateAge(data.dateOfBirth);
    document.getElementById('country-of-birth').innerText = data.countryOfBirth;
    document.getElementById('current-club').innerText = data.currentClubName;
    document.getElementById('height').innerText = `${data.heightInCm} cm`;
    document.getElementById('position').innerText = data.position;
    document.getElementById('sub-position').innerText = data.subPosition;
    document.getElementById('market-value').innerText = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
    }).format(data.marketValueInEur);
}

/**
 * Function used to load the player's main stats
 * @param {Object} data - The data about the player's main stats
 */
function loadMainStats(data) {
    document.getElementById('total-appearances').innerText = data.totalAppearances;
    document.getElementById('goals-scored').innerText = data.totalGoals;
    document.getElementById('assists').innerText = data.totalAssists;
    document.getElementById('yellow-cards').innerText = data.totalYellowCards;
    document.getElementById('red-cards').innerText = data.totalRedCards;
    document.getElementById('minutes-played').innerText = data.totalMinutesPlayed;
}

/**
 * Function used to calculate the player's age
 * @param {string} dob - The player's date of birth
 * @returns {number} - The player's age
 */
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

/**
 * Function used to create the club item in the club history table
 * @param {Object} club - The object containing the club info
 * @param {number} index - The index of the club in the list
 * @returns {HTMLTableRowElement} - The table row element for the club
 */
function createClubTableRowItem(club, index) {
    club = club[0];
    const row = document.createElement("tr");

    const clubIndex = document.createElement("td");
    clubIndex.innerText = index;
    clubIndex.classList.add('text-light');
    row.appendChild(clubIndex);

    const clubLogoCell = document.createElement("td");
    const clubLogoUrl = `https://tmssl.akamaized.net/images/wappen/head/${club.clubId}.png`;
    const clubLogo = document.createElement("img");
    clubLogo.src = clubLogoUrl;
    clubLogo.alt = club.name;
    clubLogo.style.width = "20%";
    clubLogoCell.appendChild(clubLogo);
    row.appendChild(clubLogoCell);

    const clubNameCell = document.createElement("td");
    clubNameCell.classList.add('text-light');
    const clubLink = `/club/club-info?club_id=${club.clubId}`;
    clubNameCell.innerHTML = `<a href="${clubLink}">${club.name}</a>`;
    row.appendChild(clubNameCell);

    return row;
}

/**
 * Function to insert the club table row into the club history table
 * @param {Array} clubs - The list of clubs
 */
function insertClubsIntoTable(clubs) {
    const tableBody = document.getElementById('club-history-table-body');
    clubs.forEach((club, index) => {
        const clubTableRowItem = createClubTableRowItem(club, index + 1);
        tableBody.appendChild(clubTableRowItem);
    });
}

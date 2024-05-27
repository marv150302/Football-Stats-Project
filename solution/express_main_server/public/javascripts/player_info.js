document.addEventListener('DOMContentLoaded', async function () {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const player_id = urlParams.get('player_id');
        console.log(player_id)
        sendAxiosQuery('/api/get-player-data-by-id', {playerId:player_id})
            .then(data =>{

                console.log(data)
                loadPlayerBasicInfo(data);
            })

        sendAxiosQuery('/api/get-player-basic-data-by-id-and-season', {player_id:player_id, season: 2023})
            .then(data =>{

                loadMainStats(data);
            })

        sendAxiosQuery('/api/get-player-club-history', {player_id:player_id})
            .then(data =>{

                insertClubsIntoCard(data);
            })

    } catch (error) {
        console.error('Failed to load game data:', error);
    }
});

/**
 *
 * function used to load the players data
 * @param data the data about the player
 */
function loadPlayerBasicInfo(data) {

    document.getElementById('player-image').src = data.imageUrl
    document.getElementById('player-name').innerText = data.name
    document.getElementById('age').innerText = calculateAge(data.dateOfBirth);
    document.getElementById('country-of-birth').innerText = data.countryOfBirth;
    document.getElementById('current-club').innerText  = data.currentClubName;
    document.getElementById('height').innerText = data.heightInCm + ' cm';
    document.getElementById('position').innerText = data.position
    document.getElementById('sub-position').innerText = data.subPosition;
    document.getElementById('market-value').innerText = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
    }).format(data.marketValueInEur);

}

function loadMainStats(data) {

    document.getElementById('total-appearances').innerText = data.totalAppearances;
    document.getElementById('goals-scored').innerText = data.totalGoals;
    document.getElementById('assists').innerText = data.totalAssists;
    document.getElementById('yellow-cards').innerText = data.totalYellowCards;
    document.getElementById('red-cards').innerText = data.totalRedCards;
    document.getElementById('minutes-played').innerText = data.totalMinutesPlayed;

}

/**
 *
 * function used to calculate the player's age
 * @param dob the player's date of birth
 * @returns {number}
 */
function calculateAge(dob) {
    const birthDate = new Date(dob); // Create a date object from dob
    const today = new Date(); // Get today's date

    let age = today.getFullYear() - birthDate.getFullYear(); // Get the difference in years
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // If the current month is before the birth month, or
    // it's the birth month but today's date is before the birth date,
    // then the person hasn't had their birthday yet this year, so subtract one year from the age.
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

/**
 *
 * function used to create the club item, in the club history card
 * @param club the object containing the club info
 * @returns {HTMLDivElement}
 */
function createClubCardItem(club) {

    club = club[0];
    const cardItem = document.createElement("div");
    cardItem.classList.add("col-md-4", "mb-3");

    const card = document.createElement("div");
    card.classList.add("card", "bg-success", "text-dark");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "d-flex", "flex-column", "align-items-center");

    const clubLogo_url = "https://tmssl.akamaized.net/images/wappen/head/" + club.clubId + ".png";
    const clubLogo = document.createElement("img");
    clubLogo.src = clubLogo_url; // Placeholder for logo
    clubLogo.alt = club.name; // Alt text for accessibility
    clubLogo.classList.add("img-fluid", "mb-3");
    cardBody.appendChild(clubLogo);

    // Club name
    const clubName = document.createElement("h6");
    clubName.textContent = club.name;
    clubName.classList.add("fw-bold", "text-dark", "text-center");
    cardBody.appendChild(clubName);

    // More details link
    const moreDetailsLink = document.createElement("a");
    moreDetailsLink.href = '/club/club-info?club_id=' + club.clubId;
    moreDetailsLink.textContent = "More Details";
    moreDetailsLink.classList.add("btn", "btn-warning", "mt-auto");
    cardBody.appendChild(moreDetailsLink);

    card.appendChild(cardBody);
    cardItem.appendChild(card);

    return cardItem;
}

/**
 *
 * function to insert the club card into the club history container
 * @param clubs the list of clubs
 */
function insertClubsIntoCard(clubs) {
    const cardBody = document.getElementById('club-history-card');

    clubs.forEach(club => {
        const clubCardItem = createClubCardItem(club);
        cardBody.appendChild(clubCardItem);
    });
}
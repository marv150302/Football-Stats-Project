document.addEventListener('DOMContentLoaded', async function () {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const player_id = urlParams.get('player_id');
        console.log(player_id)
        sendAxiosQuery('/api/get-player-data-by-id', {playerId:player_id})
            .then(data =>{

                console.log(data)
                loadPlayerData(data);
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
function loadPlayerData(data) {

    document.getElementById('player-image').src = data.imageUrl
    document.getElementById('player-name').innerText = data.name
    document.getElementById('age').innerText = calculateAge(data.dateOfBirth);
    document.getElementById('country-of-birth').innerText = data.countryOfBirth;
    document.getElementById('current-club').innerText  = data.currentClubName;
    document.getElementById('height').innerText = data.heightInCm + ' cm';
    document.getElementById('position').innerText = data.position
    document.getElementById('sub-position').innerText = data.subPosition;

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

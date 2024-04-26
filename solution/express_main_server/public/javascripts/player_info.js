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

}
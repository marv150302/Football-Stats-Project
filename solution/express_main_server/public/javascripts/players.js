

/**
 * Function that makes the server call with the name
 * @returns {Promise<void>}
 */
async function searchPlayers() {

    let name = document.getElementById('player-name').value;
    const player_list = await sendAxiosQuery('/api/get-player-by-name',{name:name});
    renderTable(player_list)
}

/**
 *
 * Function to render the table with the list of players
 * @param players
 */
function renderTable(players) {
    const tbody = $('#playerList');
    tbody.empty();
    players.forEach(player => {
        const club_link = '/club/club-info?' +
            'club_id=' + player.currentClubId;
        const row = `
                    <tr>
                        <td><a href="/players/player-info?player_id=${player.playerId}" class="text-white"><img src="${player.imageUrl}" alt="${player.name}" width="50"></a></td>
                        <td><a href="/players/player-info?player_id=${player.playerId}" class="text-white">${player.name}</a></td>
                        <td>${player.position}</td>
                        <td><a href="${club_link}">${player.currentClubName}</a> </td>
                    </tr>
                `;
        tbody.append(row);
    });
}
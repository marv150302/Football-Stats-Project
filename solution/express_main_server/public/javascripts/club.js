document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Fetch all clubs data from the API
        const clubs = await sendAxiosQuery('/api/get-all-clubs');

        // Group clubs by their initial letter
        const groupedClubs = groupClubsByInitial(clubs);

        createClubCards(groupedClubs);
    } catch (error) {
        console.error('Error fetching club data:', error);
    }
});

/**
 *
 * Function to create club cards and append them to the container
 * @param groupedClubs all clubs grouped by the initial
 */
function createClubCards(groupedClubs) {
    const container = document.getElementById('clubContainer');
    const initials = Object.keys(groupedClubs).sort();

    // Clear existing content in the container
    container.innerHTML = '';

    initials.forEach(initial => {
        // Create card column
        const cardColumn = document.createElement('div');
        cardColumn.className = 'col-md-4 mb-4';

        // Create card element
        const card = document.createElement('div');
        card.className = 'card bg-dark text-light';

        // Create card body element
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        // Create card title element
        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title text-warning';
        cardTitle.textContent = initial;

        // Create list group element
        const listGroup = document.createElement('ul');
        listGroup.className = 'list-group list-group-flush scrollable-list';

        // Add clubs to the list group
        groupedClubs[initial].forEach(club => {
            const clubLogoLink = `https://tmssl.akamaized.net/images/wappen/head/${club.id}.png`;
            const clubLink = `/club/club-info?club_id=${club.id}`;
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item border-0 bg-dark text-light';
            listItem.innerHTML = `<a href="${clubLink}"><img style="width: 30px; height: 40px; margin-right: 3%;" src="${clubLogoLink}" alt="${club.name} logo"> ${club.name}</a>`;
            listGroup.appendChild(listItem);
        });

        // Append elements to card and column
        cardBody.appendChild(cardTitle);
        card.appendChild(cardBody);
        card.appendChild(listGroup);
        cardColumn.appendChild(card);
        container.appendChild(cardColumn);
    });
}

/**
 * Function to group clubs by the initial letter of their name
 * @param clubs an array containing all the clubs
 * @returns {*}
 */
function groupClubsByInitial(clubs) {
    return clubs.reduce((grouped, club) => {
        const initial = club.name[0].toUpperCase();
        if (!grouped[initial]) {
            grouped[initial] = [];
        }
        grouped[initial].push({
            name: club.name,
            id: club.clubId
        });
        return grouped;
    }, {});
}

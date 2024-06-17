document.addEventListener('DOMContentLoaded', async function () {

    const clubs = await sendAxiosQuery('/api/get-all-clubs');
    const groupedClubs = groupClubsByInitial(clubs);
    createClubCards(groupedClubs);
});

function createClubCards(groupedClubs) {
    const container = document.getElementById('clubContainer');
    const initials = Object.keys(groupedClubs).sort();

    initials.forEach(initial => {
        const cardColumn = document.createElement('div');
        cardColumn.className = 'col-md-4 mb-4 bg-dark';

        const card = document.createElement('div');
        card.className = 'card bg-dark text-light';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body bg-dark';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title text-warning';
        cardTitle.textContent = initial;

        const listGroup = document.createElement('ul');
        listGroup.className = 'list-group list-group-flush scrollable-list';

        groupedClubs[initial].forEach(club => {

            const club_logo_link = "https://tmssl.akamaized.net/images/wappen/head/" + club.id + ".png"
            const club_link = '/club/club-info?' +
                'club_id=' + club.id;
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item border-0 bg-dark text-light';
            listItem.innerHTML = `<a href="${club_link}"><img style="width: 30px;height: 40px; margin-right: 3%" src=${club_logo_link}> ${club.name}</a>`;
            listGroup.appendChild(listItem);
        });

        cardBody.appendChild(cardTitle);
        card.appendChild(cardBody);
        card.appendChild(listGroup);
        cardColumn.appendChild(card);
        container.appendChild(cardColumn);
    });
}

function groupClubsByInitial(clubs) {
    const grouped = {};
    clubs.forEach(club => {
        const initial = club.name[0].toUpperCase();
        if (!grouped[initial]) {
            grouped[initial] = [];
        }
        grouped[initial].push({
            name: club.name,
            id: club.clubId
        });
    });
    return grouped;
}


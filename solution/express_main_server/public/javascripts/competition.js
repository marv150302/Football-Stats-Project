document.addEventListener('DOMContentLoaded', () => {
    const competitionTableBody = document.getElementById('competition-table').querySelector('tbody');

    // Function to format competition name and type
    function formatString(str) {
        if (!str) return ''; // Check if the string is null or undefined

        // Capitalize first letter
        str = str.charAt(0).toUpperCase() + str.slice(1);
        // Replace underscores with spaces
        str = str.replace(/_/g, ' ');
        // Replace dashes with spaces
        str = str.replace(/-/g, ' ');
        return str;
    }

    // Fetch competition data from the API endpoint
    sendAxiosQuery('/api/get-all-competitions')
        .then(data => {
            // Clear previous table rows
            competitionTableBody.innerHTML = '';

            // Add new rows to the table
            data.forEach((competition, index) => {
                const competition_logo_url = 'https://tmssl.akamaized.net/images/logo/header/' + competition.competitionId.toLowerCase() + '.png';
                const row = document.createElement('tr');
                const competition_link = "/competitions/competition-info?competition_id=" + competition.competitionId;
                row.innerHTML = `
                    <th class="text-light" scope="row">${index +1}</th>
                    <th><a href=${competition_link}><img style="height: 70px; width: 50px" src=${competition_logo_url}></a></th>
                    <td><a href=${competition_link} ><h4 class="fw-bold " >${formatString(competition.name)}</h4></a></td>
                    <td><h5 class="fw-bold " >${formatString(competition.type)}</h5></td>
                    <td><h5 class="fw-bold " >${formatString(competition.countryName)}</h5></td>
                `;
                competitionTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

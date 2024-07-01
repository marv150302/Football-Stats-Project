document.addEventListener('DOMContentLoaded', () => {
    const competitionTableBody = document.getElementById('competition-table').querySelector('tbody');

    /**
     * Function to format a string:
     * - Capitalizes the first letter
     * - Replaces underscores and dashes with spaces
     * @param {string} str - The string to format
     * @returns {string} - The formatted string
     */
    function formatString(str) {
        if (!str) return ''; // Check if the string is null or undefined

        // Capitalize first letter
        str = str.charAt(0).toUpperCase() + str.slice(1);
        // Replace underscores and dashes with spaces
        str = str.replace(/[_-]/g, ' ');
        return str;
    }

    /**
     * Fetches competition data from the API and populates the table
     */
    async function populateCompetitionTable() {
        try {
            // Fetch competition data from the API endpoint
            const data = await sendAxiosQuery('/api/get-all-competitions');

            // Clear previous table rows
            competitionTableBody.innerHTML = '';

            // Add new rows to the table
            data.forEach((competition, index) => {
                const competitionLogoUrl = `https://tmssl.akamaized.net/images/logo/header/${competition.competitionId.toLowerCase()}.png`;
                const competitionLink = `/competitions/competition-info?competition_id=${competition.competitionId}`;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <th class="text-light" scope="row">${index + 1}</th>
                    <th><a href="${competitionLink}"><img style="height: 70px; width: 50px" src="${competitionLogoUrl}" alt="${formatString(competition.name)} logo"></a></th>
                    <td><a href="${competitionLink}"><h4 class="fw-bold">${formatString(competition.name)}</h4></a></td>
                    <td><h5 class="fw-bold">${formatString(competition.type)}</h5></td>
                    <td><h5 class="fw-bold">${formatString(competition.countryName)}</h5></td>
                `;
                competitionTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    populateCompetitionTable();
});

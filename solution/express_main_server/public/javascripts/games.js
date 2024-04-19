getLastFourGamesByCompetition();
function getLastFourGamesByCompetition() {

    sendAxiosQuery('/api/get-all-competitions')
        .then(response => {
            const competitionIds = response.map(competition => competition['competitionId']);
            console.log(competitionIds)

            competitionIds.forEach(id => {
                sendAxiosQuery('/api/get-last-four-games-by-competition-and-year', {
                    params: {
                        competition_id: id,
                        year: '2023'
                    }
                })
                    .then(gamesResponse => {
                        console.log('Games for competition ID', id, ':', gamesResponse);
                        // Process or display games data as needed
                    })
                    .catch(error => {
                        console.error('Error fetching games for competition ID', id, ':', error);
                    });
            });
        })
}

const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');
const id = urlParams.get('id');

const functions = {
    player: [
        {name: 'plot_goals_assists_per_season', title: 'Track Goals & Assists Over Seasons', desc: 'See how a player\'s goals and assists stack up season by season.'},
        {name: 'plot_minutes_played_by_season', title: 'Minutes on the Field by Season', desc: 'Explore the total minutes a player has played each season.', params: ['season_start', 'season_end']},
        {name: 'plot_minutes_played_per_game', title: 'Game-by-Game Minutes Played', desc: 'Detailed breakdown of minutes played in each game for a specific season.', params: ['season']},
        {name: 'plot_market_value_over_career', title: 'Career Market Value Trends', desc: 'Visualize the changes in a player\'s market value over their career.'},
        {name: 'plot_cards_per_season', title: 'Yellow and Red Cards Over Seasons', desc: 'Track the number of yellow and red cards received by a player each season.'},
        {name: 'visualize_progression_over_career', title: 'Player Progression Over Career', desc: 'Analyze the progression of key metrics like goals, assists, and minutes played.'},
        {name: 'analyze_performance_against_teams', title: 'Performance Against Various Teams', desc: 'Detailed performance metrics against different teams.', params: ['season_start', 'season_end']},
        {name: 'plot_goals_per_minute_played', title: 'Goals per Minute Played', desc: 'View the goals scored per minute played by a player over the seasons.', params: ['season_start', 'season_end']},
        {name: 'plot_goals_against_top_clubs', title: 'Top Clubs Conceding Goals', desc: 'See which top clubs a player has scored the most goals against.'},
        {name: 'plot_home_away_goals', title: 'Home vs Away Goals', desc: 'Compare the percentage of goals scored at home versus away.'}
    ],
    club: [
        {name: 'plot_club_wins_draws_losses_season', title: 'Season Wins, Draws, and Losses', desc: 'Pie chart showing a club\'s wins, draws, and losses for a season.', params: ['season']},
        {name: 'plot_club_wins_draws_losses_seasons', title: 'Wins, Draws, and Losses Over Seasons', desc: 'Line chart tracking wins, draws, and losses between seasons.', params: ['season_start', 'season_end']},
        {name: 'plot_goals_scored_conceded_season', title: 'Goals Scored vs Conceded', desc: 'Total goals scored and conceded by a club per season.'},
        {name: 'plot_home_away_performance_season', title: 'Home vs Away Performance', desc: 'Compare home and away performance for a specific season.', params: ['season']},
        {name: 'plot_points_per_season', title: 'Points Earned Each Season', desc: 'Line chart showing the points gained per season by a club.'},
        {name: 'plot_squad_market_value', title: 'Squad Market Value Over Time', desc: 'Track the total market value of the squad over time.'},
        {name: 'plot_squad_market_value_and_wins', title: 'Squad Market Value and Wins', desc: 'Dual-axis chart showing squad market value and wins per season.'},
        {name: 'plot_wins_draws_losses_managers_grouped', title: 'Manager Performance: Wins, Draws, Losses', desc: 'Grouped bar chart showing wins, draws, and losses under different managers.', params: ['threshold']},
        {name: 'plot_goals_scored_conceded_managers_grouped', title: 'Manager Performance: Goals Scored vs Conceded', desc: 'Grouped bar chart showing goals scored and conceded under different managers.', params: ['threshold']}
    ],
    competition: [
        {name: 'plot_top_scorers', title: 'Top Scorers of the Season', desc: 'Bar chart of the top 10 scorers in a specific competition and season.', params: ['season']},
        {name: 'plot_average_goals_per_game', title: 'Average Goals per Game', desc: 'Line chart showing the average goals per game in a competition.', params: ['season']},
        {name: 'plot_attendance_statistics', title: 'Attendance Stats', desc: 'Track the attendance statistics per game in a competition.', params: ['season']},
        {name: 'plot_top_teams_by_wins', title: 'Top Teams by Wins', desc: 'Bar chart showing the top 10 teams by wins in a competition.', params: ['season']},
        {name: 'plot_top_assists_providers', title: 'Top Assists Providers', desc: 'Bar chart of the top assists providers in a competition.', params: ['season', 'top_n']},
        {name: 'plot_current_standings', title: 'Current Competition Standings', desc: 'Displays current standings with points, wins, draws, losses, goals for, and goals against.', params: ['season']},
        {name: 'plot_home_vs_away_goals_conceded', title: 'Home vs Away Goals Conceded', desc: 'Bar chart showing the home vs. away goals conceded by teams.', params: ['season']},
        {name: 'plot_home_vs_away_goals_scored', title: 'Home vs Away Goals Scored', desc: 'Bar chart showing the home vs. away goals scored by teams.', params: ['season']},
        {name: 'plot_monthly_goal_scoring_trends', title: 'Monthly Goal Scoring Trends', desc: 'Line chart showing the monthly goal-scoring trends in a competition.', params: ['season']},
        {name: 'plot_match_outcome_distribution', title: 'Match Outcome Distribution', desc: 'Pie chart showing the distribution of match outcomes (home wins, away wins, draws).', params: ['season']},
        {name: 'plot_goals_by_time_interval', title: 'Goals by Time Interval', desc: 'Bar chart showing the goals scored in different time intervals in a competition.', params: ['season']}
    ]
};

function createFunctionCard(func) {
    const card = document.createElement('div');
    card.className = 'card bg-dark text-white mb-3';
    card.style = 'width: 18rem;';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';

    const header = document.createElement('h5');
    header.className = 'card-title text-warning fw-bold p-2';
    header.textContent = func.title;

    const desc = document.createElement('p');
    desc.className = 'card-text';
    desc.textContent = func.desc;

    cardBody.appendChild(header);
    cardBody.appendChild(desc);

    if (func.params) {
        func.params.forEach(param => {
            const input = document.createElement('input');
            input.type = 'number';
            input.min = '2012';
            input.max = '2023';
            input.className = 'form-control mb-2 bg-dark text-light';
            input.placeholder = param.replace('_', ' ').toUpperCase();
            input.name = `${func.name}_${param}`;
            input.value = param.includes('start') ? 2012 : 2023; // Default values
            cardBody.appendChild(input);
        });
    }

    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'mt-auto';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'selectedFunctions';
    checkbox.value = func.name;
    checkbox.className = 'form-check-input';

    const checkboxLabel = document.createElement('label');
    checkboxLabel.className = 'form-check-label ms-2';
    checkboxLabel.textContent = 'Select';

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkboxLabel);
    cardBody.appendChild(checkboxContainer);

    card.appendChild(cardBody);

    return card;
}

function displayFunctions() {
    const functionList = document.getElementById('functionList');
    functionList.innerHTML = '';
    const selectedFunctions = functions[type];
    let row;

    selectedFunctions.forEach((func, index) => {
        if (index % 4 === 0) {
            row = document.createElement('div');
            row.className = 'row mb-4';
            functionList.appendChild(row);
        }
        const col = document.createElement('div');
        col.className = 'col-md-3 d-flex align-items-stretch';
        const funcCard = createFunctionCard(func);
        col.appendChild(funcCard);
        row.appendChild(col);
    });

}

function submitSelections() {
    const selectedFunctions = document.querySelectorAll('input[name="selectedFunctions"]:checked');
    const selections = [];
    selectedFunctions.forEach(checkbox => {
        const funcName = checkbox.value;
        const inputs = document.querySelectorAll(`input[name^="${funcName}"]`);
        const params = [`player_id=${id}`]; // Default param for player, you can adapt based on type
        inputs.forEach(input => {
            const paramName = input.name.split('_').pop();
            params.push(`${paramName}=${input.value}`);
        });
        const functionCall = `${funcName}(${params.join(', ')})`;
        selections.push(functionCall);
    });
    console.log('Selected Functions:', selections);
    // You can send the selections to the server or handle them as needed
}

document.addEventListener('DOMContentLoaded', displayFunctions);

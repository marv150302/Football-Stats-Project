package com.example.progetto_ium_tweb.gamelineup;

import com.example.progetto_ium_tweb.clubs.Club;
import com.example.progetto_ium_tweb.competition.Competition;
import com.example.progetto_ium_tweb.competition.CompetitionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
public class GameLineupService {

    private final GameLineupRepository game_lineup_repository;

    @Autowired
    public GameLineupService(GameLineupRepository game_lineup_repository) {
        this.game_lineup_repository = game_lineup_repository;
    }

    /**
     * Retrieves all game lineups from the database.
     *
     * @return A list of GameLineup objects representing all game lineups.
     */
    public List<GameLineup> getAllGamesLineup() {
        return this.game_lineup_repository.findAll();
    }

    /**
     * Retrieves a game lineup from the database.
     * @param game_id the id of the game
     * @return A list of GameLineup objects representing a specific game lineup.
     */
    public List<GameLineup> getGameLineupById(String game_id) {
        return this.game_lineup_repository.getGameLineupById(game_id);
    }

    /**
     *
     * @param player_id the id of the player whose club history we want to retrieve
     * @return a list of the player's club history
     */
    public List<Object[]> getPlayerClubAppearanceHistory(@RequestParam String player_id){

        return this.game_lineup_repository.getPlayerClubAppearanceHistory(player_id);
    }


}

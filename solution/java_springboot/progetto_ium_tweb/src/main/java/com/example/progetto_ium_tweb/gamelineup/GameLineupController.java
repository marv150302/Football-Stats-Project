package com.example.progetto_ium_tweb.gamelineup;
import com.example.progetto_ium_tweb.clubs.Club;
import com.example.progetto_ium_tweb.competition.Competition;
import com.example.progetto_ium_tweb.competition.CompetitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin
public class GameLineupController {

    private final GameLineupService game_lineup_service;

    @Autowired
    public GameLineupController(GameLineupService game_lineup_service) {
        this.game_lineup_service = game_lineup_service;
    }

    /**
     * Retrieves all game lineups from the database.
     *
     * @return A list of GameLineup objects representing all game lineups.
     */
    @GetMapping("/get-all-games-lineup")
    public List<GameLineup> getAllGamesLineup(){

        return this.game_lineup_service.getAllGamesLineup();
    }
}

package com.example.progetto_ium_tweb.playervaluation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;



@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin
public class PlayerValuationController {

    private final PlayerValuationService player_valuation_service;

    @Autowired
    public PlayerValuationController(PlayerValuationService player_valuation_service) {
        this.player_valuation_service = player_valuation_service;
    }

    /**
     * Retrieves all player valuations from the database.
     *
     * @return A list of PlayerValuation objects representing all player valuations.
     */
    @GetMapping("/get-all-players-valuation")
    public List<PlayerValuation> getAllPlayersValuation(){

        return this.player_valuation_service.getAllPlayersValuation();
    }
}

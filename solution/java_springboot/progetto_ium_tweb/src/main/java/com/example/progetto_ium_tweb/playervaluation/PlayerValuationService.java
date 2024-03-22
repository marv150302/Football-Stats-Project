package com.example.progetto_ium_tweb.playervaluation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerValuationService {

    private final PlayerValuationRepository player_valuation_repository;

    @Autowired
    public PlayerValuationService(PlayerValuationRepository player_valuation_repository) {
        this.player_valuation_repository = player_valuation_repository;
    }

    /**
     * Retrieves all player valuations from the database.
     *
     * @return A list of PlayerValuation objects representing all player valuations.
     */
    public List<PlayerValuation> getAllPlayersValuation() {
        return this.player_valuation_repository.findAll();
    }
}

package com.example.progetto_ium_tweb.players;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {

    private final PlayerRepository player_repository;

    @Autowired
    public PlayerService(PlayerRepository player_repository) {
        this.player_repository = player_repository;
    }

    /**
     * Retrieves all players from the database.
     *
     * @return A list of Player objects representing all players.
     */
    public List<Player> getAllGamesLineup() {
        return this.player_repository.findAll();
    }
}

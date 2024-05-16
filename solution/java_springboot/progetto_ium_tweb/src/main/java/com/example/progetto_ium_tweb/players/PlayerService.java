package com.example.progetto_ium_tweb.players;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public List<Player> getAllPlayers() {
        return this.player_repository.findAll();
    }

    /**
     * Retrieves a player's information by his ID
     *
     * @return A list of info about a Player found  by his ID
     */
    public Player getPlayerDataByID(String ID) {
        return this.player_repository.getPlayerInfoById(ID);
    }

    /**
     *
     * Get the list of players of a club
     * @param club_id the id of the club
     * @return a list of player object
     */
    public ArrayList<Player> getClubPlayers(String club_id) {
        return this.player_repository.getClubPlayers(club_id);
    }
}

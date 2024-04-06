package com.example.progetto_ium_tweb.players;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin
@RequestMapping("/players")
public class PlayerController {

    private final PlayerService player_service;

    @Autowired
    public PlayerController(PlayerService player_service) {
        this.player_service = player_service;
    }

    /**
     * Retrieves all players from the database.
     *
     * @return A list of Player objects representing all players.
     */
    @GetMapping("/get-all-players")
    public List<Player> getAllPlayers(){

        return this.player_service.getAllPlayers();
    }

    /**
     * Retrieves player's info by his ID
     *
     * @return A list of info about a Player found  by his ID
     */
    @GetMapping("/get-player-data-by-id")
    public ResponseEntity<Player> getPlayerDataByID(@RequestParam String playerId){

        Player data = this.player_service.getPlayerDataByID(playerId);
        return   ResponseEntity.ok(data); // 200 OK with JSON body

    }
}

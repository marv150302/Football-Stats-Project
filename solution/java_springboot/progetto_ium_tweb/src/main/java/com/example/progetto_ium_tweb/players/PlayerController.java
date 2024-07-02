package com.example.progetto_ium_tweb.players;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/players")
public class PlayerController {

    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    /**
     * Retrieves all players from the database.
     *
     * @return A ResponseEntity containing a list of Player objects representing all players and the HTTP status code.
     */
    @GetMapping("/get-all-players")
    public ResponseEntity<List<Player>> getAllPlayers() {
        List<Player> players = playerService.getAllPlayers();
        if (players.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(players, HttpStatus.OK);
    }

    /**
     * Retrieves player's info by their ID.
     *
     * @param playerId the ID of the player
     * @return A ResponseEntity containing a Player object and the HTTP status code.
     */
    @GetMapping("/get-player-data-by-id")
    public ResponseEntity<Player> getPlayerDataByID(@RequestParam String playerId) {
        Player data = playerService.getPlayerDataByID(playerId);
        if (data == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    /**
     * Get the list of players of a club.
     *
     * @param clubId the ID of the club
     * @return A ResponseEntity containing a list of Player objects and the HTTP status code.
     */
    @GetMapping("/get-club-players")
    public ResponseEntity<List<Player>> getClubPlayers(@RequestParam String clubId) {
        List<Player> players = playerService.getClubPlayers(clubId);
        if (players.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(players, HttpStatus.OK);
    }

    /**
     * Get player(s) by name.
     *
     * @param name the name of the player
     * @return A ResponseEntity containing a list of Player objects and the HTTP status code.
     */
    @GetMapping("/get-player-by-name")
    public ResponseEntity<List<Player>> getPlayerByName(@RequestParam String name) {
        List<Player> players = playerService.getPlayerByName(name);
        if (players.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(players, HttpStatus.OK);
    }
}

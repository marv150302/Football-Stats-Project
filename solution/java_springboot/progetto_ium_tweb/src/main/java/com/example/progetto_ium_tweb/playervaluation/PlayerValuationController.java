package com.example.progetto_ium_tweb.playervaluation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/players-valuations")
public class PlayerValuationController {

    private final PlayerValuationService playerValuationService;

    @Autowired
    public PlayerValuationController(PlayerValuationService playerValuationService) {
        this.playerValuationService = playerValuationService;
    }

    /**
     * Retrieves all player valuations from the database.
     *
     * @return A ResponseEntity containing a list of PlayerValuation objects representing all player valuations and the HTTP status code.
     */
    @GetMapping("/get-all-players-valuation")
    public ResponseEntity<List<PlayerValuation>> getAllPlayersValuation() {
        List<PlayerValuation> valuations = playerValuationService.getAllPlayersValuation();
        if (valuations.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(valuations, HttpStatus.OK);
    }
}

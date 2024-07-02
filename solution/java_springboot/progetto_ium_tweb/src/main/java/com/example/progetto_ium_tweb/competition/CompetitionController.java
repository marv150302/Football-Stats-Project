package com.example.progetto_ium_tweb.competition;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/competitions")
public class CompetitionController {

    private final CompetitionService competitionService;

    @Autowired
    public CompetitionController(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }

    /**
     * Retrieves all competitions from the database.
     *
     * @return A ResponseEntity containing a list of Competition objects representing all competitions and the HTTP status code.
     */
    @GetMapping("/get-all-competitions")
    public ResponseEntity<List<Competition>> getAllCompetitions() {
        List<Competition> competitions = competitionService.getAllCompetitions();
        return new ResponseEntity<>(competitions, HttpStatus.OK);
    }

    /**
     * Retrieves all competition names from the database.
     *
     * @return A ResponseEntity containing a list of String objects representing all competition names and the HTTP status code.
     */
    @GetMapping("/get-all-competitions-name")
    public ResponseEntity<List<String>> getAllCompetitionNames() {
        List<String> competitionNames = competitionService.getAllCompetitionNames();
        return new ResponseEntity<>(competitionNames, HttpStatus.OK);
    }

    /**
     * Retrieves a competition by its ID.
     *
     * @param competition_id the id of the competition
     * @return A ResponseEntity containing a list of Competition objects representing the competition and the HTTP status code.
     */
    @GetMapping("/get-competition-by-id")
    public ResponseEntity<List<Competition>> getCompetitionById(@RequestParam String competition_id) {
        List<Competition> competitionData = competitionService.getCompetitionById(competition_id);
        if (competitionData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(competitionData, HttpStatus.OK);
    }
}

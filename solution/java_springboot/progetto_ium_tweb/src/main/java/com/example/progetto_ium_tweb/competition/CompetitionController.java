package com.example.progetto_ium_tweb.competition;

import com.example.progetto_ium_tweb.clubs.Club;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin
public class CompetitionController {

    private final CompetitionService competitionService;

    @Autowired
    public CompetitionController(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }

    /**
     * Retrieves all competitions from the database.
     *
     * @return A list of Competition objects representing all competitions.
     */
    @GetMapping("/get-all-competitions")
    public List<Competition> getAllCompetitions(){

        return this.competitionService.getAllCompetitions();
    }
}

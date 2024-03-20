package com.example.progetto_ium_tweb.clubs;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin

public class ClubController {

    private final ClubService clubService;

    @Autowired
    public ClubController(ClubService clubService) {
        this.clubService = clubService;
    }

    /**
     * Retrieves all clubs from the database.
     *
     * @return A list of Club objects representing all clubs.
     */
    @GetMapping("/get-all-clubs")
    public List<Club> getAllClubs(){

        return this.clubService.getAllClubs();
    }
}

package com.example.progetto_ium_tweb.clubs;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
// Allow requests from this origin
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"}) // Allow requests from this origin
@RequestMapping("/clubs")

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

    /**
     * Retrieves all clubs names from the clubs table.
     * @return  A list of String objects representing all clubs names.
     */
    @GetMapping("/get-all-clubs-name")
    public List<String> getAllClubNames() {
        return clubService.getAllClubsName();
    }
}

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

    /**
     *
     * function used to get all the info about a club by its id
     * @param club_id the id of the club whose info we need to retrieve
     * @return a list containing info about a club
     */
    @GetMapping("/get-club-data-by-id")
    public List<Club> getClubDataById(@RequestParam String club_id){

        return this.clubService.getClubDataById(club_id);
    }
}

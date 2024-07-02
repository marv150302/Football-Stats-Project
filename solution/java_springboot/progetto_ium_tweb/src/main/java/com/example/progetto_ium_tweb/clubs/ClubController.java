package com.example.progetto_ium_tweb.clubs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
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
     * @return A ResponseEntity containing a list of Club objects representing all clubs and the HTTP status code.
     */
    @GetMapping("/get-all-clubs")
    public ResponseEntity<List<Club>> getAllClubs() {
        List<Club> clubs = clubService.getAllClubs();
        return new ResponseEntity<>(clubs, HttpStatus.OK);
    }

    /**
     * Retrieves all club names from the clubs table.
     *
     * @return A ResponseEntity containing a list of String objects representing all club names and the HTTP status code.
     */
    @GetMapping("/get-all-clubs-name")
    public ResponseEntity<List<String>> getAllClubNames() {
        List<String> clubNames = clubService.getAllClubsName();
        return new ResponseEntity<>(clubNames, HttpStatus.OK);
    }

    /**
     * Retrieves all the info about a club by its id.
     *
     * @param club_id the id of the club whose info we need to retrieve
     * @return A ResponseEntity containing a list of Club objects with info about the club and the HTTP status code.
     */
    @GetMapping("/get-club-data-by-id")
    public ResponseEntity<List<Club>> getClubDataById(@RequestParam String club_id) {
        List<Club> clubData = clubService.getClubDataById(club_id);
        if (clubData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(clubData, HttpStatus.OK);
    }
}

package com.example.progetto_ium_tweb.clubs;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ClubController {

    private final ClubService clubService;

    @Autowired
    public ClubController(ClubService clubService) {
        this.clubService = clubService;
    }

    @GetMapping("/getAllClubs")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin
    public List<Club> getAllClubs(){

        return this.clubService.getClubs();
    }
}

package com.example.progetto_ium_tweb.clubs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubService {

    private final ClubRepository clubRepository; // Assuming you have a ClubRepository interface

    @Autowired
    public ClubService(ClubRepository clubRepository) {

        this.clubRepository = clubRepository;
    }

    /**
     * Retrieves all clubs from the database.
     *
     * @return A list of Club objects representing all clubs.
     */
    public List<Club> getAllClubs() {
        // Call the findAll method of the clubRepository to fetch all clubs from the database
        return this.clubRepository.findAll();
    }
}

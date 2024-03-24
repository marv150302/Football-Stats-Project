package com.example.progetto_ium_tweb.clubs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClubService {

    private final ClubRepository clubRepository;

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
        return this.clubRepository.findAll();
    }

    /**
     * Retrieves all clubs names from the clubs table.
     * @return  A list of String objects representing all clubs names.
     */
    public List<String> getAllClubsName(){

        // Fetch all clubs with non-null names from the repository
        return clubRepository.findAllByNameNotNull();
    }

}

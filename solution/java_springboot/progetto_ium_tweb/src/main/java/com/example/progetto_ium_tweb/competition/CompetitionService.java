package com.example.progetto_ium_tweb.competition;

import com.example.progetto_ium_tweb.clubs.Club;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompetitionService {

    private final CompetitionRepository competition_repository;

    @Autowired
    public CompetitionService(CompetitionRepository competitionRepository) {
        competition_repository = competitionRepository;
    }

    /**
     * Retrieves all competitions from the database.
     *
     * @return A list of Competition objects representing all competitions.
     */
    public List<Competition> getAllCompetitions() {

        return this.competition_repository.findAll();
    }

    // Method to retrieve names of all competitions using custom SQL query
    public List<String> getAllCompetitionNames() {
        return this.competition_repository.findAllCompetitionNames();
    }
}

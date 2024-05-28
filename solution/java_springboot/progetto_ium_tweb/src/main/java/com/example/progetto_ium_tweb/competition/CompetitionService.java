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

        return this.competition_repository.findAllCompetition();
    }

    /**
     *
     * Functionn to retrieve names of all competitions using custom SQL query
     * @return  List containing all the competitions
     */
    public List<String> getAllCompetitionNames() {
        return this.competition_repository.findAllCompetitionNames();
    }

    /**
     *
     * Function to get the data about a competition by its ID
     * @param competition_id the id of the competition
     * @return an object containing the data about the competition
     */
    public List<Competition> getCompetitionById(String competition_id){


        return this.competition_repository.getCompetitionById(competition_id);
    }
}

package com.example.progetto_ium_tweb.competition;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface CompetitionRepository extends JpaRepository<Competition, Long> {

    /**
     *
     * Custom SQL query to fetch names of all competitions
     * @return List containing all the competitions
     */
    @Query("SELECT c.name FROM Competition c ORDER BY c.name ASC")
    List<String> findAllCompetitionNames();

    /**
     * Custom Sql query to fetch all competitions info, and order by the name
     * @return List containing all the competitions
     */
    @Query("SELECT c FROM Competition c ORDER BY c.name ASC")
    List<Competition> findAllCompetition();
}

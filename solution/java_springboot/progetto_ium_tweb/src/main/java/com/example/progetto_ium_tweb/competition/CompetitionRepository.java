package com.example.progetto_ium_tweb.competition;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CompetitionRepository extends JpaRepository<Competition, Long> {

    // Custom SQL query to fetch names of all competitions
    @Query("SELECT c.name FROM Competition c WHERE c.name IS NOT NULL")
    List<String> findAllCompetitionNames();
}

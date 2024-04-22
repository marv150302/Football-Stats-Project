package com.example.progetto_ium_tweb.gamelineup;

import com.example.progetto_ium_tweb.competition.Competition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GameLineupRepository extends JpaRepository<GameLineup, Long> {

    /**
     * Custom Sql query to fetch all competitions info, and order by the name
     * @return List containing all the competitions
     */
    @Query(value = "SELECT g FROM GameLineup g WHERE g.gameId = :game_id    ")


    List<GameLineup> getGameLineupById(String game_id);

}

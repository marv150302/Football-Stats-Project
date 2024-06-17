package com.example.progetto_ium_tweb.players;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;


public interface PlayerRepository extends JpaRepository<Player, Long> {

    /**
     * Query used to get data about a player
     * @param ID the id of the player
     * @return a player object
     */
    @Query("SELECT p FROM Player p  WHERE p.playerId = :ID")
    Player getPlayerInfoById(String ID);

    /**
     * Query used to get the list of players of  clubs
     * @param club_id the id of the club
     * @return a list of player object
     */
    @Query("SELECT p FROM Player p WHERE p.currentClubId = :club_id")
    ArrayList<Player> getClubPlayers(String club_id);

    /**
     * Query used to get players by name
     * @param name the name of the player(it can contain the surname)
     * @return a list of player object
     */
    @Query("SELECT p FROM Player p WHERE LOWER(p.name) LIKE CONCAT('%', LOWER(:name), '%')")
    ArrayList<Player> getPlayerByName(String name);
}

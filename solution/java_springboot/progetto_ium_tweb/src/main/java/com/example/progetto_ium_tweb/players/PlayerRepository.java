package com.example.progetto_ium_tweb.players;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;


public interface PlayerRepository extends JpaRepository<Player, Long> {

    @Query("SELECT p FROM Player p  WHERE p.playerId = :ID")
    Player getPlayerInfoById(String ID);
}

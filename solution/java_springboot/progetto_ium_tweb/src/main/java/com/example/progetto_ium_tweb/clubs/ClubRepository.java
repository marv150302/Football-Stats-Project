package com.example.progetto_ium_tweb.clubs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClubRepository extends JpaRepository<Club, Long> {



    // Custom query method to fetch clubs with non-null names
    @Query("SELECT c.name FROM Club c WHERE c.name IS NOT NULL")
    List<String> findAllByNameNotNull();

    /**
     *
     * function used to get all the info about a club by its id
     * @param club_id the id of the club whose info we need to retrieve
     * @return a list containing info about a club
     */
    @Query("select c from Club c where c.clubId = :club_id")
    List<Club> getClubDataById(String club_id);
}

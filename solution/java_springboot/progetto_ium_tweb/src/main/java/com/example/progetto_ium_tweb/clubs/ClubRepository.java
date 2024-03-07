package com.example.progetto_ium_tweb.clubs;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClubRepository extends JpaRepository<Club, Long> {


    /**
     * we are going to use this to handle the queries regarding the club
     */
}

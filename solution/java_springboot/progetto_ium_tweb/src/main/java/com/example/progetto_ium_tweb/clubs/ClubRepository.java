package com.example.progetto_ium_tweb.clubs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClubRepository extends JpaRepository<Club, Long> {



    // Custom query method to fetch clubs with non-null names
    @Query("SELECT c.name FROM Club c WHERE c.name IS NOT NULL")
    List<String> findAllByNameNotNull();

}

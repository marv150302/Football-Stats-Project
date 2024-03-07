package com.example.progetto_ium_tweb.playervaluation;

import jakarta.persistence.*;

@Entity
@Table(name = "player_valuations")
public class PlayerValuation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "player_valuation_id")
    private Long playerValuationId;

    @Column(name = "player_id")
    private Long playerId;

    @Column(name = "last_season")
    private Integer lastSeason;

    @Column(name = "datetime")
    private String datetime;

    @Column(name = "date")
    private String date;

    @Column(name = "dateweek")
    private String dateweek;

    @Column(name = "market_value_in_eur")
    private Double marketValueInEur;

    @Column(name = "n")
    private Integer n;

    @Column(name = "current_club_id")
    private Long currentClubId;

    @Column(name = "player_club_domestic_competition_id")
    private String playerClubDomesticCompetitionId;

    public PlayerValuation() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPlayerValuationId() {
        return playerValuationId;
    }

    public void setPlayerValuationId(Long playerValuationId) {
        this.playerValuationId = playerValuationId;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public Integer getLastSeason() {
        return lastSeason;
    }

    public void setLastSeason(Integer lastSeason) {
        this.lastSeason = lastSeason;
    }

    public String getDatetime() {
        return datetime;
    }

    public void setDatetime(String datetime) {
        this.datetime = datetime;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDateweek() {
        return dateweek;
    }

    public void setDateweek(String dateweek) {
        this.dateweek = dateweek;
    }

    public Double getMarketValueInEur() {
        return marketValueInEur;
    }

    public void setMarketValueInEur(Double marketValueInEur) {
        this.marketValueInEur = marketValueInEur;
    }

    public Integer getN() {
        return n;
    }

    public void setN(Integer n) {
        this.n = n;
    }

    public Long getCurrentClubId() {
        return currentClubId;
    }

    public void setCurrentClubId(Long currentClubId) {
        this.currentClubId = currentClubId;
    }

    public String getPlayerClubDomesticCompetitionId() {
        return playerClubDomesticCompetitionId;
    }

    public void setPlayerClubDomesticCompetitionId(String playerClubDomesticCompetitionId) {
        this.playerClubDomesticCompetitionId = playerClubDomesticCompetitionId;
    }
}

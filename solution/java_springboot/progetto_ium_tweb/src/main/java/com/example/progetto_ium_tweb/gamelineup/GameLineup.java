package com.example.progetto_ium_tweb.gamelineup;
import jakarta.persistence.*;

@Entity
@Table(name = "game_lineups")
public class GameLineup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "game_lineups_id")
    private String gameLineupsId;

    @Column(name = "game_id")
    private Long gameId;

    @Column(name = "club_id")
    private Long clubId;

    @Column(name = "type")
    private String type;

    @Column(name = "number")
    private String number;

    @Column(name = "player_id")
    private Long playerId;

    @Column(name = "player_name")
    private String playerName;

    @Column(name = "team_captain")
    private Integer teamCaptain;

    @Column(name = "position")
    private String position;

    public GameLineup() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGameLineupsId() {
        return gameLineupsId;
    }

    public void setGameLineupsId(String gameLineupsId) {
        this.gameLineupsId = gameLineupsId;
    }

    public Long getGameId() {
        return gameId;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }

    public Long getClubId() {
        return clubId;
    }

    public void setClubId(Long clubId) {
        this.clubId = clubId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public Integer getTeamCaptain() {
        return teamCaptain;
    }

    public void setTeamCaptain(Integer teamCaptain) {
        this.teamCaptain = teamCaptain;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }
}

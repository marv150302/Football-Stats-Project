const mongoose = require('mongoose');

const GAME_SCHEMA = new mongoose.Schema({
    game_id: { type: Number, required: true },
    competition_id: { type: String, required: true },
    season: { type: String },
    round: { type: String },
    date: { type: Date, required: true },
    home_club_id: { type: Number, required: true },
    away_club_id: { type: Number, required: true },
    home_club_goals: { type: Number, default: 0 },
    away_club_goals: { type: Number, default: 0 },
    home_club_position: { type: Number },
    away_club_position: { type: Number },
    home_club_manager_name: { type: String },
    away_club_manager_name: { type: String },
    stadium: { type: String },
    attendance: { type: Number },
    referee: { type: String },
    url: { type: String },
    home_club_formation: { type: String },
    away_club_formation: { type: String },
    home_club_name: { type: String },
    away_club_name: { type: String },
    aggregate: { type: String },
    competition_type: { type: String }
});

const Game = mongoose.model('Game', GAME_SCHEMA);

module.exports = Game;

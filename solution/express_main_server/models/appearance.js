const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 *
 * Appearance Schema
 */
const appearanceSchema = new Schema({
    appearance_id: { type: String, required: true },
    game_id: { type: String, required: true },
    player_id: { type: String, required: true },
    player_club_id: { type: String, required: true },
    player_current_club_id: { type: String, required: true },
    date: { type: Date, required: true },
    player_name: { type: String, required: true, max: 100 },
    competition_id: { type: String, required: true },
    yellow_cards: { type: Number, default: 0 },
    red_cards: { type: Number, default: 0 },
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    minutes_played: { type: Number, default: 0 },
});

// Create a model using the schema
const Appearance = mongoose.model('Appearance', appearanceSchema);

module.exports = Appearance;

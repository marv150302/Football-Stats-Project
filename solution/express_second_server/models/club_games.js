const MONGOOSE = require('mongoose');
const SCHEMA = MONGOOSE.Schema;

/**
 * Club games schema
 * @type {module:MONGOOSE.SCHEMA<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, {own_manager_name: {type: StringConstructor}, opponent_goals: {default: number, type: NumberConstructor}, opponent_position: {type: NumberConstructor}, opponent_id: {type: StringConstructor, required: boolean}, own_goals: {default: number, type: NumberConstructor}, opponent_manager_name: {type: StringConstructor}, hosting: {type: BooleanConstructor}, club_id: {type: StringConstructor, required: boolean}, is_win: {type: BooleanConstructor}, own_position: {type: NumberConstructor}, game_id: {type: StringConstructor, required: boolean}}, HydratedDocument<FlatRecord<{own_manager_name: {type: StringConstructor}, opponent_goals: {default: number, type: NumberConstructor}, opponent_position: {type: NumberConstructor}, opponent_id: {type: StringConstructor, required: boolean}, own_goals: {default: number, type: NumberConstructor}, opponent_manager_name: {type: StringConstructor}, hosting: {type: BooleanConstructor}, club_id: {type: StringConstructor, required: boolean}, is_win: {type: BooleanConstructor}, own_position: {type: NumberConstructor}, game_id: {type: StringConstructor, required: boolean}}>, {}>>}
 */
const CLUB_GAMES_SCHEMA = new SCHEMA({
    game_id: {type: Number, required: true},
    club_id: {type: Number, required: true},
    own_goals: {type: Number, default: 0},
    own_position: {type: Number},
    own_manager_name: {type: String},
    opponent_id: {type: Number, required: true},
    opponent_goals: {type: Number, default: 0},
    opponent_position: {type: Number},
    opponent_manager_name: {type: String},
    hosting: {type: String},
    is_win: {type: Number}
});

// Create and export the ClubGames model
module.exports = MONGOOSE.model('ClubGames', CLUB_GAMES_SCHEMA);

var express = require('express');
var router = express.Router();
const APPEARANCE_ROUTER = require('./appearances');
const CLUB_GAMES_ROUTER = require('./club_games');
const GAME_ROUTER = require('./game');
const GAME_EVENT_ROUTER = require('./game_event');
const CLUB_ROUTER = require('./club');
const COMPETITIONS_ROUTER = require('./competition');
const GAME_LINEUP_ROUTER = require('./games_lineup');
const PLAYER_ROUTER = require('./player');
const PLAYER_VALUATION_ROUTER = require('./player_valuation');


// Mounting all the different routers for all the different tables
router.use('/api', APPEARANCE_ROUTER);
router.use('/api', CLUB_GAMES_ROUTER);
router.use('/api', GAME_ROUTER);
router.use('/api', GAME_EVENT_ROUTER);


/**
 *
 * the following are calling a postgres database using
 * springboot
 */
router.use('/api', CLUB_ROUTER);
router.use('/api', COMPETITIONS_ROUTER);
router.use('/api', GAME_LINEUP_ROUTER);
router.use('/api', PLAYER_ROUTER);
router.use('/api', PLAYER_VALUATION_ROUTER);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Footballytics' });

});


module.exports = router;

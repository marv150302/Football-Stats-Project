var express = require('express');
var router = express.Router();
const cors = require('cors');


router.use(cors())


const APPEARANCE_ROUTER = require('./appearances');
const CLUB_GAMES_ROUTER = require('./club_games');
const GAME_ROUTER = require('./game');
const GAME_EVENT_ROUTER = require('./game_event');
const CLUB_ROUTER = require('./club');
const COMPETITIONS_ROUTER = require('./competition');
const GAME_LINEUP_ROUTER = require('./games_lineup');
const PLAYER_ROUTER = require('./player');
const PLAYER_VALUATION_ROUTER = require('./player_valuation');
const ROOM_LIST_ROUTER = require('./room');


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
router.use('/api', ROOM_LIST_ROUTER);

/* GET home page. */
router.get('/', function(req, res, next) {

  const locals = {

    title: 'Football APP',
    description: 'Simple Website created for football fans'
  }

  res.render('index', { locals });

});

/**
 * route to get the games page
 */
router.get('/games', function(req, res, next) {

  const locals = {

    title: 'Games',
    description: 'All football matches available'
  }

  res.render('games', { locals });

});

/**
 *
 * route for the game info page
 */
router.get('/games/game-info', function (req,res) {

  const locals = {
    title: 'Game Info',
    description: 'Detailed Info About the game'
  };
  res.render('game_info', { locals });
})

/**
 *
 * route for the club info page
 */
router.get('/club/club-info', function (req,res) {

  const locals = {
    title: 'Club Data',
    description: 'Detailed Info About the Club'
  };
  res.render('club_info', { locals });
})


/**
 *
 * route for the player_info page
 */
router.get('/players/player-info', function (req,res) {

  const locals = {
    title: 'Player Data',
    description: 'Detailed Info About the Player'
  };
  res.render('player_info', { locals });
})

router.get('/competitions', function (req, res) {

  const locals = {

    title: 'Competitions',
    description: 'Info about each competition'
  }
  res.render('competitions', {locals});
})

router.get('/competitions/competition-info', function (req, res) {

  const locals = {

    title: 'Competitions',
    description: 'Info about each competition'
  }
  res.render('competition_info', {locals});
})

router.get('/clubs', function (req, res) {

  const locals = {

    title: 'Clubs',
    description: 'List of all clubs'
  }

  res.render('clubs',{locals});
})

router.get('/players', function (req, res) {

  const locals = {

    title: 'Search for players',
    description: 'Search Players'
  }

  res.render('player',{locals});
})
module.exports = router;

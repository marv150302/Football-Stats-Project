var express = require('express');
var router = express.Router();
const cors = require('cors');
const setupSwagger = require('./swagger'); // Import the Swagger setup function


router.use(cors())
setupSwagger(router);



const APPEARANCE_ROUTER = require('./appearances');
const CLUB_GAMES_ROUTER = require('./club_games');
const GAME_ROUTER = require('./game');
const GAME_EVENT_ROUTER = require('./game_event');
const ROOM_LIST_ROUTER = require('./room');


// Mounting all the different routers for all the different tables
router.use('/api', APPEARANCE_ROUTER);
router.use('/api', CLUB_GAMES_ROUTER);
router.use('/api', GAME_ROUTER);
router.use('/api', GAME_EVENT_ROUTER);


/* GET home page. */
/**
 * @swagger
 * /:
 *   get:
 *     summary: Render the home page
 *     responses:
 *       200:
 *         description: The home page
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get('/', function(req, res, next) {
  const locals = {
    title: 'Football APP',
    description: 'Simple Website created for football fans'
  }
  res.render('index', { locals });
});

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Render the games page
 *     responses:
 *       200:
 *         description: The games page
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get('/games', function(req, res, next) {
  const locals = {
    title: 'Games',
    description: 'All football matches available'
  }
  res.render('games', { locals });
});

/**
 * @swagger
 * /games/game-info:
 *   get:
 *     summary: Render the game info page
 *     responses:
 *       200:
 *         description: The game info page
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get('/games/game-info', function (req, res) {
  const locals = {
    title: 'Game Info',
    description: 'Detailed Info About the game'
  };
  res.render('game_info', { locals });
});

/**
 * @swagger
 * /club/club-info:
 *   get:
 *     summary: Render the club info page
 *     responses:
 *       200:
 *         description: The club info page
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get('/club/club-info', function (req, res) {
  const locals = {
    title: 'Club Data',
    description: 'Detailed Info About the Club'
  };
  res.render('club_info', { locals });
});

/**
 * @swagger
 * /players/player-info:
 *   get:
 *     summary: Render the player info page
 *     responses:
 *       200:
 *         description: The player info page
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get('/players/player-info', function (req, res) {
  const locals = {
    title: 'Player Data',
    description: 'Detailed Info About the Player'
  };
  res.render('player_info', { locals });
});

/**
 * @swagger
 * /competitions:
 *   get:
 *     summary: Render the competitions page
 *     responses:
 *       200:
 *         description: The competitions page
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get('/competitions', function (req, res) {
  const locals = {
    title: 'Competitions',
    description: 'Info about each competition'
  }
  res.render('competitions', {locals});
});

/**
 * @swagger
 * /competitions/competition-info:
 *   get:
 *     summary: Render the competition info page
 *     responses:
 *       200:
 *         description: The competition info page
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get('/competitions/competition-info', function (req, res) {
  const locals = {
    title: 'Competitions',
    description: 'Info about each competition'
  }
  res.render('competition_info', {locals});
});

/**
 * @swagger
 * /clubs:
 *   get:
 *     summary: Render the clubs page
 *     responses:
 *       200:
 *         description: The clubs page
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get('/clubs', function (req, res) {
  const locals = {
    title: 'Clubs',
    description: 'List of all clubs'
  }
  res.render('clubs', {locals});
});

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Render the players list page
 *     responses:
 *       200:
 *         description: The players list page
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get('/players', function (req, res) {
  const locals = {
    title: 'Search for players',
    description: 'Search Players'
  }
  res.render('player', {locals});
});

/**
 * @swagger
 * /forum:
 *   get:
 *     summary: Render the forum page
 *     responses:
 *       200:
 *         description: The forum page
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get('/forum', function (req, res) {
  const locals = {
    title: 'Forum',
    description: 'Discuss with other pundits'
  }
  res.render('forum', {locals});
});

module.exports = router;


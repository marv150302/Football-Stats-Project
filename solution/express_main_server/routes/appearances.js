const appearanceExpress = require('express');
const appearanceRouter = appearanceExpress.Router();
const appearanceController = require('../controllers/appearances');

// Route to retrieve all data from the "Appearances" collection
appearanceRouter.get('/appearances', appearanceController.getAllAppearances);

module.exports = appearanceRouter;

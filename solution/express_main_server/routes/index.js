var express = require('express');
var router = express.Router();
const axios = require('axios');
const appearancesRouter = require('./appearances');

// Mounting the appearances router
router.use('/api', appearancesRouter);


router.get('/fetch-clubs', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:8081/getAllClubs');
    const clubs = response.data;
    // Handle the data retrieved from the Spring API ìì
    res.json(clubs);
  } catch (error) {
    // Handle errors
    console.error('Error fetching clubs from Spring API:', error);
    res.status(500).json({ error: 'Failed to fetch clubs from Spring API' });
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Footballytics' });

});

/*
router.post('/query', async (req, res, next) => {
  try {
    const results = await controller.query(req.body);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});*/
module.exports = router;

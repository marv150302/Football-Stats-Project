var express = require('express');
var router = express.Router();
const {log} = require("debug");


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

var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: respond with a resource
 */
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

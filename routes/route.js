var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  next();
});

router.get('/', function(req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

module.exports = router;
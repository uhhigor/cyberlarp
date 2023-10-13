var express = require('express');
var router = express.Router();

var usr = require('../users.js');

router.get('/', function(req, res) {
  res.render('login');
});

router.get('/get-index-data', function(req, res) {
  res.render('index-data', req.body.user);
});


router.post('/', async function(req, res) {
  let id = req.body.login;
  if(id) {
    let user = await usr.getUserByID(id);
    console.log(user);
    if(user) {
      res.render('index', {user: user});
    }
    else {
      res.render('login', { error: 'NoUser' });
    }
  } else { res.render('login'); }
});

module.exports = router;

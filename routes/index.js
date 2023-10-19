var express = require('express');
var router = express.Router();

var users = require('../users.js');
var styles = require('../styles.js');
var teams = require('../teams.js');

router.get('/', function(req, res) {
  res.render('login');
});

router.post('/', async function(req, res) {
  let id = req.body.login;
  if(id) {
    let user = await users.getUserByID(id);
    if(user) {
      let style = await styles.getStyleByID(user.styleID);
      let team = await teams.getTeamByID(user.teamID);
      if(style && team) {
        res.render('index', {user: user, style: style, team: team});
      }
      else {
        res.render('login', { error: 'Błąd podczas pobierania danych: style, team.' });
      }
    }
    else {
      res.render('login', { error: 'Nie ma takiego konta.' });
    }
  } else { res.render('login'); }
});

module.exports = router;

const express = require('express');
const { json, urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/indexRouter');
const playersRouter = require('./routes/playersRouter');
const gigsRouter = require('./routes/gigsRouter');
const stylesRouter = require('./routes/stylesRouter');
const gigsCharacterRouter = require('./routes/gigsCharactersRouter');
const charactersRouter = require('./routes/charactersRouter');
const factionsRouter = require('./routes/factionsRouter');
const initDb = require('./api/db/initDb');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

initDb();

app.use('/', indexRouter);
app.use('/players', playersRouter);
app.use('/gigs', gigsRouter);
app.use('/styles', stylesRouter);
app.use('/gigsCharacters', gigsCharacterRouter);
app.use('/characters', charactersRouter);
app.use('/factions', factionsRouter);

module.exports = app;
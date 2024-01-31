const { Router } = require('express');
const { getAllPlayers, getPlayerById, createPlayer, updatePlayer } = require('../api/controllers/playersController');

var router = Router();

// Get all players
router.get('/', getAllPlayers);

// Get player by id
router.get('/:id', getPlayerById);

// Create player
router.post('/', createPlayer);

// Update player
router.patch('/:id', updatePlayer);

module.exports = router;
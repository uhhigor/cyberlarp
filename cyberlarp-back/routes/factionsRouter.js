const { Router } = require('express');
const { getAllFactions, getFactionById, createFaction, updateFaction, deleteFaction } = require('../api/controllers/factionsController');

var router = Router();

// Get all factions
router.get('/', getAllFactions);

// Get faction by id
router.get('/:id', getFactionById);

// Create new faction
router.post('/', createFaction);

// Update faction
router.patch('/:id', updateFaction);

// Delete faction
router.delete('/:id', deleteFaction);

module.exports = router;
const Router = require('express');

const { getAllCharacterGigs, getGigCharacterById, assignGigToCharacter, updateGigStatus, deleteGigCharacter } = require('../api/controllers/gigsCharactersController');

var router = Router();

// Get all character gigs
router.get('/', getAllCharacterGigs);

// Get character gig by id
router.get('/:id', getGigCharacterById);

// Assign gig to character
router.post('/', assignGigToCharacter);

// Update gig status
router.patch('/:id', updateGigStatus);

// Delete gigCharacter
router.delete('/:id', deleteGigCharacter);

module.exports = router;


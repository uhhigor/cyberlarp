const { Router } = require('express');

const { getAllGigs, getGigById, createGig, updateGig, deleteGig } = require('../api/controllers/gigsController');

var router = Router();

// Get all gigs
router.get('/', getAllGigs);

// Get gig by id
router.get('/:id', getGigById);

// Create new gig
router.post('/', createGig);

// Update gig
router.patch('/:id', updateGig);

// Delete gig
router.delete('/:id', deleteGig);

module.exports = router;
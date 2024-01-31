const { Router } = require('express');

const { getAllStyles, getStyleById, createStyle, updateStyle, deleteStyle } = require('../api/controllers/stylesController');

var router = Router();

// Get all styles
router.get('/', getAllStyles);

// Get style by id
router.get('/:id', getStyleById);

// Create new style
router.post('/', createStyle);

// Update style
router.patch('/:id', updateStyle);

// Delete style
router.delete('/:id', deleteStyle);

module.exports = router;
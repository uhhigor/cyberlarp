const Router = require('express');

const { getAllCharacters, getCharacterById, createCharacter, updateCharacter, deleteCharacter } = require('../api/controllers/charactersController');

var router = Router();

// Get all characters
router.get('/', getAllCharacters);

// Get character by id
router.get('/:id', getCharacterById);

// Create new character
router.post('/', createCharacter);

// Update character
router.patch('/:id', updateCharacter);

// Delete character
router.delete('/:id', deleteCharacter);

module.exports = router;
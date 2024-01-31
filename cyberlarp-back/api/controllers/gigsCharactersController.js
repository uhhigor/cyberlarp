const { StatusCodes } = require('http-status-codes');
const { ProblemDocument, ProblemDocumentExtension } = require('http-problem-details');
const { Gig, Character, GigCharacter } = require('../db/models');

const getAllCharacterGigs = async (req, res) => {
    const characterGigs = await GigCharacter.findAll({ where: { characterId: req.params.id } });
    if (characterGigs.length === 0) {
        const error = new ProblemDocument({
            title: 'No gigs.',
            detail: 'No gigs found for character with given id.',
            instance: req.originalUrl,
            status: StatusCodes.NOT_FOUND,
        });
        return res.status(error.status).json(error);
    }
    res.status(StatusCodes.OK).json(characterGigs);
}

const getGigCharacterById = async (req, res) => {
    const gigCharacter = await GigCharacter.findByPk(req.params.id);
    if(gigCharacter === null) {
        const error = new ProblemDocument({
            title: 'GigCharacter not found.',
            detail: 'GigCharacter with given id not found.',
            instance: req.originalUrl,
            status: StatusCodes.NOT_FOUND,
        });
        return res.status(error.status).json(error);
    }
    res.status(StatusCodes.OK).json(gig);
}

const assignGigToCharacter = async (req, res) => {
    const validateBody = async (body) => {
        let validationErrors = [];
        if (!body.gig) {
            validationErrors.push({"name": "gig", "reason": "Gig ID is required."})
        } else {
            let gig = await Gig.findByPk(body.gig);
            if (!gig) {
                validationErrors.push({"name": "gig", "reason": "Gig with given id not found."})
            }
        }
        if (!body.character) {
            validationErrors.push({"name": "character", "reason": "Character ID is required."})
        } else {
            let character = await Character.findByPk(body.character);
            if (!character) {
                validationErrors.push({"name": "character", "reason": "Character with given id not found."})
            }
        }
        if (validationErrors.length > 0)
        {
            const extension = new ProblemDocumentExtension({
                "invalid-params": validationErrors,
            });
            const error = new ProblemDocument({
                title: 'Validation error.',
                detail: 'Validation error occurred while creating new gigCharacter.',
                instance: req.originalUrl,
                status: StatusCodes.BAD_REQUEST,
            }, extension);
            return error;
        }
    }
    const error = await validateBody(req.body);
    if (error) {
        return res.status(error.status).json(error);
    }

    const gigCharacter = await GigCharacter.create(req.body);
    res.status(StatusCodes.CREATED).json(gigCharacter);
}

const updateGigStatus = async (req, res) => {
    const validateBody = async (body) => {
        let validationErrors = [];
        if (!body.status) {
            validationErrors.push({"name": "status", "reason": "Status is required."})
        } else {
            if (body.status !== 'ongoing' && body.status !== 'failed' && body.status !== 'completed') {
                validationErrors.push({"name": "status", "reason": "Status must be 'ongoing', 'failed' or 'completed'."})
            }
        }
        if (validationErrors.length > 0)
        {
            const extension = new ProblemDocumentExtension({
                "invalid-params": validationErrors,
            });
            const error = new ProblemDocument({
                title: 'Validation error.',
                detail: 'Validation error occurred while updating gigCharacter status.',
                instance: req.originalUrl,
                status: StatusCodes.BAD_REQUEST,
            }, extension);
            return error;
        }
    }

    const error = await validateBody(req.body);
    if (error) {
        return res.status(error.status).json(error);
    }

    const gigCharacter = await GigCharacter.findByPk(req.params.id);
    await gigCharacter.update(req.body);
    res.status(StatusCodes.OK).json(gigCharacter);
}

const deleteGigCharacter = async (req, res) => {
    const gigCharacter = await GigCharacter.findByPk(req.params.id);
    if(gigCharacter === null) {
        const error = new ProblemDocument({
            title: 'Character not found.',
            detail: 'GigCharacter with given id not found.',
            instance: req.originalUrl,
            status: StatusCodes.NOT_FOUND,
        });
        return res.status(error.status).json(error);
    }
    await gigCharacter.destroy();
    res.status(StatusCodes.OK).json();
}
    

module.exports = {
    getAllCharacterGigs,
    getGigCharacterById,
    assignGigToCharacter,
    updateGigStatus,
    deleteGigCharacter,
};
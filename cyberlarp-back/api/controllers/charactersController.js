const { StatusCodes } = require('http-status-codes');
const { ProblemDocument, ProblemDocumentExtension } = require('http-problem-details');
const { Character, Player, Faction, Style } = require('../db/models');

const getAllCharacters = async (req, res) => {
    const characters = await Character.findAll();
    if (players.length === 0) {
        const error = new ProblemDocument({
            title: 'No characters.',
            detail: 'No characters found.',
            instance: req.originalUrl,
            status: StatusCodes.NOT_FOUND,
        });
        return res.status(error.status).json(error);
    }
    res.status(StatusCodes.OK).json(characters);
}

const getCharacterById = async (req, res) => {
    const character = await Character.findByPk(req.params.id);
    if(character === null) {
        const error = new ProblemDocument({
            title: 'Character not found.',
            detail: 'Character with given id not found.',
            instance: req.originalUrl,
            status: StatusCodes.NOT_FOUND,
        });
        return res.status(error.status).json(error);
    }
    res.status(StatusCodes.OK).json(character);
}

const createCharacter = async (req, res) => {
    const validateBody = async (body) => {
        let validationErrors = [];
        if (!body.user) {
            validationErrors.push({"name": "user", "reason": "User ID is required."})
        }
        if (!body.faction) {
            validationErrors.push({"name": "faction", "reason": "Faction ID is required."})
        }
        if (!body.style) {
            validationErrors.push({"name": "style", "reason": "Style ID is required."})
        }
        if (!body.name) {
            validationErrors.push({"name": "name", "reason": "Name is required."})
        } else {
            let character = await Character.findOne({ where: { name: body.name } });
            if (character) {
                validationErrors.push({"name": "name", "reason": "Name must be unique."})
            }
        }
        if (!body.description) {
            validationErrors.push({"name": "description", "reason": "Description is required."})
        }
        if (validationErrors.length > 0)
        {
            const extension = new ProblemDocumentExtension({
                "invalid-params": validationErrors,
            });
            const error = new ProblemDocument({
                title: 'Validation error.',
                detail: 'Validation error occurred while creating new character.',
                instance: req.originalUrl,
                status: StatusCodes.BAD_REQUEST,
            }, extension);
            return error;
        }
        return null;
    }
    const error = await validateBody(req.body);
    if (error) {
        return res.status(error.status).json(error);
    }

    const character = await Character.create(req.body);
    res.status(StatusCodes.CREATED).json(character);
}

const updateCharacter = async (req, res) => {
    const validateBody = async (body) => {
        let validationErrors = [];
        if (body.user) {
            let p = await Player.findByPk(body.user);
            if (!p) {
                validationErrors.push({"name": "user", "reason": "Player with given id not found."})
            }
        }
        if (body.faction) {
            let f = await Faction.findByPk(body.faction);
            if (!f) {
                validationErrors.push({"name": "faction", "reason": "Faction with given id not found."})
            }
        }
        if (body.style) {
            let s = await Style.findByPk(body.style);
            if (!s) {
                validationErrors.push({"name": "style", "reason": "Style with given id not found."})
            }
        }
        if (body.name) {
            let c = await Character.findOne({ where: { name: body.name } });
            if (c) {
                validationErrors.push({"name": "name", "reason": "Name must be unique."})
            }
        }
        let c = await Character.findByPk(req.params.id);
        if (!c) {
            validationErrors.push({"name": "id", "reason": "Character with given id not found."})
        }
        if (validationErrors.length > 0)
        {
            const extension = new ProblemDocumentExtension({
                "invalid-params": validationErrors,
            });
            const error = new ProblemDocument({
                title: 'Validation error.',
                detail: 'Validation error occurred while updating character.',
                instance: req.originalUrl,
                status: StatusCodes.BAD_REQUEST,
            }, extension);
            return error;
        }
        return null;
    }

    const error = await validateBody(req.body);
    if (error) {
        return res.status(error.status).json(error);
    }

    const character = await Character.findByPk(req.params.id);
    await character.update(req.body);
    res.status(StatusCodes.OK).json(character);
}

const deleteCharacter = async (req, res) => {
    const character = await Character.findByPk(req.params.id);
    if(character === null) {
        const error = new ProblemDocument({
            title: 'Character not found.',
            detail: 'Character with given id not found.',
            instance: req.originalUrl,
            status: StatusCodes.NOT_FOUND,
        });
        return res.status(error.status).json(error);
    }
    await character.destroy();
    res.status(StatusCodes.OK).json();
}
    

module.exports = {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,
};
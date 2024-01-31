const { StatusCodes } = require('http-status-codes');
const { ProblemDocument, ProblemDocumentExtension } = require('http-problem-details');
const { Faction } = require('../db/models');

const getAllFactions = async (req, res) => {
    const factions = await Faction.findAll();
    if (factions.length === 0) {
        const error = new ProblemDocument({
            title: 'No factions.',
            detail: 'No factions found.',
            instance: req.originalUrl,
            status: StatusCodes.NOT_FOUND,
        });
        return res.status(error.status).json(error);
    }
    res.status(StatusCodes.OK).json(factions);
}

const getFactionById = async (req, res) => {
    const faction = await Faction.findByPk(req.params.id);
    if(faction === null) {
        const error = new ProblemDocument({
            title: 'Faction not found.',
            detail: 'Faction with given id not found.',
            instance: req.originalUrl,
            status: StatusCodes.NOT_FOUND,
        });
        return res.status(error.status).json(error);
    }
    res.status(StatusCodes.OK).json(faction);
}

const createFaction = async (req, res) => {
    const validateBody = async (body) => {
        let validationErrors = [];
        if (!body.name) {
            validationErrors.push({"name": "name", "reason": "Name is required."})
        } else {
            let faction = await Faction.findOne({ where: { name: body.name } });
            if (faction) {
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
                detail: 'Validation error occurred while creating new faction.',
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

    const faction = await Faction.create(req.body);
    res.status(StatusCodes.CREATED).json(faction);
}

const updateFaction = async (req, res) => {
    const validateBody = async (body) => {
        let validationErrors = [];
        if (body.name) {
            let faction = await Faction.findOne({ where: { name: body.name } });
            if (faction) {
                validationErrors.push({"name": "name", "reason": "Name must be unique."})
            }
        }
        let f = await Faction.findByPk(req.params.id);
        if (!f) {
            validationErrors.push({"name": "id", "reason": "Faction with given id not found."})
        }
        if (validationErrors.length > 0)
        {
            const extension = new ProblemDocumentExtension({
                "invalid-params": validationErrors,
            });
            const error = new ProblemDocument({
                title: 'Validation error.',
                detail: 'Validation error occurred while updating faction.',
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

    const faction = await Faction.findByPk(req.params.id);
    await faction.update(req.body);
    res.status(StatusCodes.OK).json(faction);
}

const deleteFaction = async (req, res) => {
    const faction = await Faction.findByPk(req.params.id);
    if(faction === null) {
        const error = new ProblemDocument({
            title: 'Faction not found.',
            detail: 'Faction with given id not found.',
            instance: req.originalUrl,
            status: StatusCodes.NOT_FOUND,
        });
        return res.status(error.status).json(error);
    }
    await faction.destroy();
    res.status(StatusCodes.OK).json();
}
    

module.exports = {
    getAllFactions,
    getFactionById,
    createFaction,
    updateFaction,
    deleteFaction,
};
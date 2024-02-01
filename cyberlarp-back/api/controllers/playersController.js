const { StatusCodes } = require('http-status-codes');
const { ProblemDocument, ProblemDocumentExtension } = require('http-problem-details');
const { Player } = require('../db/models');

const getAllPlayers = async (req, res) => {
    const players = await Player.findAll();
    if (players.length === 0) {
        const error = new ProblemDocument({
            title: 'No players.',
            detail: 'No players found.',
            instance: req.originalUrl,
            status: StatusCodes.NOT_FOUND,
        });
        return res.status(error.status).json(error);
    }
    res.status(StatusCodes.OK).json(players);
}

const getPlayerById = async (req, res) => {
    const player = await Player.findByPk(req.params.id);
    if(player === null) {
        const error = new ProblemDocument({
            title: 'Player not found.',
            detail: 'Player with given id not found.',
            instance: req.originalUrl,
            status: StatusCodes.NOT_FOUND,
        });
        return res.status(error.status).json(error);
    }
    res.status(StatusCodes.OK).json(player);
}

const createPlayer = async (req, res) => {
    const validateBody = async (body) => {
        let validationErrors = [];
        if (!body.password) {
            validationErrors.push({"name": "password", "reason": "Password is required."})
        } else {
            if (body.password.length < 8) {
                validationErrors.push({"name": "password", "reason": "Password must be at least 8 characters long."})
            }
        }
        if (!body.name) {
            validationErrors.push({"name": "name", "reason": "Name is required."})
        } else {
            let p = await Player.findOne({ where: { name: body.name } });
            if (p) {
                validationErrors.push({"name": "name", "reason": "Name must be unique."})
            }
        }
        if (validationErrors.length > 0)
        {
            const extension = new ProblemDocumentExtension({
                "invalid-params": validationErrors,
            });
            const error = new ProblemDocument({
                title: 'Validation error.',
                detail: 'Validation error occurred while creating new player.',
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

    const player = await Player.create(req.body);
    res.status(StatusCodes.CREATED).json(player);
}

const updatePlayer = async (req, res) => {
    const validateBody = async (body) => {
        let validationErrors = [];
        if (body.password && body.password.length < 8) {
            validationErrors.push({"name": "password", "reason": "Password must be at least 8 characters long."})
        }
        if (body.name) {
            let p = await Player.findOne({ where: { name: body.name } });
            if (p) {
                if(p.id != req.params.id)
                    validationErrors.push({"name": "name", "reason": "Name must be unique."})
            }
        }
        let p = await Player.findByPk(req.params.id);
        if (!p) {
            validationErrors.push({"name": "id", "reason": "Player with given id not found."})
        }
        if (validationErrors.length > 0)
        {
            const extension = new ProblemDocumentExtension({
                "invalid-params": validationErrors,
            });
            const error = new ProblemDocument({
                title: 'Validation error.',
                detail: 'Validation error occurred while updating player.',
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

    const player = await Player.findByPk(req.params.id);
    await player.update(req.body);
    res.status(StatusCodes.OK).json(player);
}

const deletePlayer = async (req, res) => {
    const player = await Player.findByPk(req.params.id);
    if(player === null) {
        const error = new ProblemDocument({
            title: 'Player not found.',
            detail: 'Player with given id not found.',
            instance: req.originalUrl,
            status: StatusCodes.NOT_FOUND,
        });
        return res.status(error.status).json(error);
    }
    await player.destroy();
    res.status(StatusCodes.OK).json();
}
    

module.exports = {
    getAllPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer,
};
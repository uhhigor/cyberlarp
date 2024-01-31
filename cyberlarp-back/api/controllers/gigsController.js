const { StatusCodes } = require('http-status-codes');
const { ProblemDocument, ProblemDocumentExtension } = require('http-problem-details');
const { Gig } = require('../db/models');

const getAllGigs = async (req, res) => {
    const gigs = await Gig.findAll();
    if (gigs.length === 0) {
        const error = new ProblemDocument({
            title: 'No gigs.',
            detail: 'No gigs found.',
            instance: req.originalUrl,
            status: StatusCodes.NOT_FOUND,
        });
        return res.status(error.status).json(error);
    }
    res.status(StatusCodes.OK).json(gigs);
}

const getGigById = async (req, res) => {
    const gig = await Gig.findByPk(req.params.id);
    if(gig === null) {
        const error = new ProblemDocument({
            title: 'Gig not found.',
            detail: 'Gig with given id not found.',
            instance: req.originalUrl,
            status: StatusCodes.NOT_FOUND,
        });
        return res.status(error.status).json(error);
    }
    res.status(StatusCodes.OK).json(gig);
}

const createGig = async (req, res) => {
    const validateBody = async (body) => {
        let validationErrors = [];
        if (!body.name) {
            validationErrors.push({"name": "name", "reason": "Name is required."})
        } else {
            let gig = await Gig.findOne({ where: { name: body.name } });
            if (gig) {
                validationErrors.push({"name": "name", "reason": "Name must be unique."})
            }
        }
        if (!body.description) {
            validationErrors.push({"name": "description", "reason": "Description is required."})
        }
        if (!body.reward) {
            validationErrors.push({"name": "reward", "reason": "Reward is required."})
        } else {
            if (body.reward < 0) {
                validationErrors.push({"name": "reward", "reason": "Reward must be a positive number."})
            }
        }
        if (validationErrors.length > 0)
        {
            const extension = new ProblemDocumentExtension({
                "invalid-params": validationErrors,
            });
            const error = new ProblemDocument({
                title: 'Validation error.',
                detail: 'Validation error occurred while creating new gig.',
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

    const gig = await Gig.create(req.body);
    res.status(StatusCodes.CREATED).json(gig);
}

const updateGig = async (req, res) => {
    const validateBody = async (body) => {
        let validationErrors = [];
        if (body.name) {
            let gig = await Gig.findOne({ where: { name: body.name } });
            if (gig) {
                validationErrors.push({"name": "name", "reason": "Name must be unique."})
            }
        }
        if (body.reward && body.reward < 0) {
            validationErrors.push({"name": "reward", "reason": "Reward must be a positive number."})
        }

        let g = await Gig.findByPk(req.params.id);
        if (!g) {
            validationErrors.push({"name": "id", "reason": "Gig with given id not found."})
        }
        if (validationErrors.length > 0)
        {
            const extension = new ProblemDocumentExtension({
                "invalid-params": validationErrors,
            });
            const error = new ProblemDocument({
                title: 'Validation error.',
                detail: 'Validation error occurred while updating gig.',
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

    const gig = await Gig.findByPk(req.params.id);
    await gig.update(req.body);
    res.status(StatusCodes.OK).json(gig);
}

const deleteGig = async (req, res) => {
    const gig = await Gig.findByPk(req.params.id);
    if(gig === null) {
        const error = new ProblemDocument({
            title: 'Gig not found.',
            detail: 'Gig with given id not found.',
            instance: req.originalUrl,
            status: StatusCodes.NOT_FOUND,
        });
        return res.status(error.status).json(error);
    }
    await gig.destroy();
    res.status(StatusCodes.OK).json();
}
    

module.exports = {
    getAllGigs,
    getGigById,
    createGig,
    updateGig,
    deleteGig,
};
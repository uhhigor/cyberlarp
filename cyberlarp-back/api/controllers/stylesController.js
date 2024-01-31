const { StatusCodes } = require('http-status-codes');
const { ProblemDocument, ProblemDocumentExtension } = require('http-problem-details');
const { Style } = require('../db/models');

const getAllStyles = async (req, res) => {
    const styles = await Style.findAll();
    if (styles.length === 0) {
        const error = new ProblemDocument({
            title: 'No styles.',
            detail: 'No styles found.',
            instance: req.originalUrl,
            status: StatusCodes.NOT_FOUND,
        });
        return res.status(error.status).json(error);
    }
    res.status(StatusCodes.OK).json(styles);
}

const getStyleById = async (req, res) => {
    const style = await Style.findByPk(req.params.id);
    if(style === null) {
        const error = new ProblemDocument({
            title: 'Style not found.',
            detail: 'Style with given id not found.',
            instance: req.originalUrl,
            status: StatusCodes.NOT_FOUND,
        });
        return res.status(error.status).json(error);
    }
    res.status(StatusCodes.OK).json(style);
}

const createStyle = async (req, res) => {
    const validateBody = async (body) => {
        let validationErrors = [];
        if (!body.name) {
            validationErrors.push({"name": "name", "reason": "Name is required."})
        } else {
            let style = await Style.findOne({ where: { name: body.name } });
            if (style) {
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
                detail: 'Validation error occurred while creating new style.',
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

    const style = await Style.create(req.body);
    res.status(StatusCodes.CREATED).json(style);
}

const updateStyle = async (req, res) => {
    const validateBody = async (body) => {
        let validationErrors = [];
        if (body.name) {
            let style = await Style.findOne({ where: { name: body.name } });
            if (style) {
                validationErrors.push({"name": "name", "reason": "Name must be unique."})
            }
        }
        let s = await Style.findByPk(req.params.id);
        if (!s) {
            validationErrors.push({"name": "id", "reason": "Style with given id not found."})
        }
        if (validationErrors.length > 0)
        {
            const extension = new ProblemDocumentExtension({
                "invalid-params": validationErrors,
            });
            const error = new ProblemDocument({
                title: 'Validation error.',
                detail: 'Validation error occurred while updating style.',
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

    const style = await Style.findByPk(req.params.id);
    await style.update(req.body);
    res.status(StatusCodes.OK).json(style);
}

const deleteStyle = async (req, res) => {
    const style = await Style.findByPk(req.params.id);
    if(style === null) {
        const error = new ProblemDocument({
            title: 'Style not found.',
            detail: 'Style with given id not found.',
            instance: req.originalUrl,
            status: StatusCodes.NOT_FOUND,
        });
        return res.status(error.status).json(error);
    }
    await style.destroy();
    res.status(StatusCodes.OK).json();
}
    

module.exports = {
    getAllStyles,
    getStyleById,
    createStyle,
    updateStyle,
    deleteStyle,
};
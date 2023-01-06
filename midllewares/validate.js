const validate = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const validationError = new Error(error.message)
            validationError.status = 400
            next(validationError)
        }
        next()
    }

    return func;
}

module.exports = validate;
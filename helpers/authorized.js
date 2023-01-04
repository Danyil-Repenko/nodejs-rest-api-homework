const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const { User } = require('../shemas/user')

dotenv.config();
const { SECRET } = process.env;

const authorized = async (req, res, next) => {
    const unauthorizedErr = res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Unauthorized',
        data: 'Unauthorized',
    });
    try {
        const { authorization = '' } = req.headers;
        const [bearer, token] = authorization.split(" ")

        if (bearer !== 'Bearer') return unauthorizedErr

        const { id } = jwt.verify(token, SECRET)
        const user = await User.findById(id)

        if (!user || !id) {
            return unauthorizedErr
        }

        req.user = user;
        next();
    } catch {
        return unauthorizedErr;
    }
};

module.exports = authorized;
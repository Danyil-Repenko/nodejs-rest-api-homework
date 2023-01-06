const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const { User } = require('../shemas/user')

dotenv.config();
const { SECRET } = process.env;

const authorized = async (req, res, next) => {
    try {
        const { authorization = '' } = req.headers;
        const [bearer, token] = authorization.split(" ")

        if (bearer !== 'Bearer') {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }

        const { id } = jwt.verify(token, SECRET)
        const user = await User.findById(id)

        if (!user || token !== String(user.token) || !user.token) {
            return res.status(401).json({
                message: 'Unauthorized'

            });
        }

        req.user = user;
        next();
    } catch {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};

module.exports = authorized;
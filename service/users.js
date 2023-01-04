const { User } = require('../shemas/user');
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');

dotenv.config();
const { SECRET } = process.env;

const register = async ({ email, password }) => {
    const alreadyUser = User.findOne({ email })
    if (!alreadyUser) {
        return null
    }

    const saltedPassword = await bcrypt.hash(password, 10)
    return User.create({ email, password: saltedPassword })
}

const login = ({ email, password }) => {
    const isUser = User.findOne({ email })
    const correctPassword = bcrypt.compare(password, isUser.password)
    if (!isUser || !correctPassword) {
        return null
    }

    const payload = { id: isUser._id }
    const token = jwt.sign(payload, SECRET, { expiresIn: '3h' })
    console.log(token)

    return User.findByIdAndUpdate(isUser._id, { $set: { token } })
}

const logout = (fields) => {

}

const getCurrent = (fields) => {

}

module.exports = {
    register,
    login,
    logout,
    getCurrent
}
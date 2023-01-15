const { User } = require('../shemas/user');
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');

dotenv.config();
const { SECRET } = process.env;

const register = async ({ email, password, avatarURL }) => {
    const alreadyUser = await User.findOne({ email })
    if (alreadyUser) {
        return null
    }

    const saltedPassword = await bcrypt.hash(password, 10)
    return await User.create({ email, password: saltedPassword, avatarURL })
}

const login = async ({ email, password }) => {
    const isUser = await User.findOne({ email })

    const correctPassword = await bcrypt.compare(password, isUser.password)
    if (!isUser || !correctPassword) {
        return null
    }

    const payload = { id: isUser._id }
    const token = jwt.sign(payload, SECRET, { expiresIn: '5h' })
    const logedUser = await User.findByIdAndUpdate(isUser._id, { $set: { token } })
    logedUser.token = token
    return logedUser
}

const logout = async (userId) => {
    const logedOut = await User.findByIdAndUpdate(userId, { $set: { token: null } })
    return logedOut
}

const getCurrent = async (userId) => {
    const current = await User.findById(userId)
    return current
}

const changeSub = async (userId, subscription) => {
    const changedSub = await User.findByIdAndUpdate(userId, { $set: { subscription } })
    return changedSub
}

const updateAvatar = async (userId, avatar) => {
    const newAva = await User.findByIdAndUpdate(userId, { $set: { avatarURL: avatar } })
    return newAva
}

module.exports = {
    register,
    login,
    logout,
    getCurrent,
    changeSub,
    updateAvatar
}
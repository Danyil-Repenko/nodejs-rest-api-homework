const { User } = require('../shemas/user');
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const sendMail = require('../helpers/verification')

dotenv.config();
const { SECRET } = process.env;

const register = async (fields) => {
    const { email } = fields
    const alreadyUser = await User.findOne({ email })
    if (alreadyUser) {
        return null
    }

    const saltedPassword = await bcrypt.hash(fields.password, 10)
    return await User.create({ ...fields, password: saltedPassword })
}

const login = async ({ email, password }) => {
    const isUser = await User.findOne({ email })
    if (isUser.verify === false) {
        return { message: "Unverified" }
    }
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

const verify = async (token) => {
    const user = await User.findOne({ verificationToken: token })
    if (!user) {
        return null
    } else if (user.verify === true) {
        return { message: "Already verified" }
    }
    const verifiedUser = await User.findByIdAndUpdate(user._id, { $set: { verify: true, verificationToken: '' } })
    return verifiedUser
}

const sendVerification = async (email) => {
    const user = await User.findOne({ email })
    if (!user) {
        return null
    } else if (user.verify === true) {
        return { message: "Already verified" }
    }
    const message = {
        to: email, subject: "Verify your email", html: `<a href="http://localhost:300/api/users/verify/${user.verificationToken}" turget="_blank">Click this link to verify</a>`
    }
    await sendMail(message)
    return true
}

module.exports = {
    register,
    login,
    logout,
    getCurrent,
    changeSub,
    updateAvatar,
    verify,
    sendVerification
}
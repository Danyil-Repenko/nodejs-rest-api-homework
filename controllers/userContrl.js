const { userFuncs } = require('../service')
const gravatar = require('gravatar')
const path = require('path')
const fs = require('fs').promises
const uniqid = require('uniqid');
const adjust = require('../helpers/adjustImage');
const sendMail = require("../helpers/verification")

const register = async (req, res, next) => {
    let avatarURL = null
    try {
        const { email, password } = req.body;

        if (req.file === undefined) {
            avatarURL = gravatar.url(email)
        } else {
            const { path: tempDir, filename } = req.file
            await adjust(tempDir)
            const publicDir = path.join(__dirname, '..', 'public', 'avatars', filename)
            await fs.rename(tempDir, publicDir)
            avatarURL = path.join('avatars', filename)
        }
        const verificationToken = uniqid()
        const newUser = await userFuncs.register({ email, password, avatarURL, verificationToken })

        if (newUser) {
            const message = {
                to: email, subject: "Verify your email", html: `<a href="http:localhost:300/api/users/verify/${verificationToken}" turget="_blank">Click this link to verify</a>`
            }
            await sendMail(message)
            res.status(201).json({
                message: "User created",
                user: {
                    email: newUser.email,
                    subscription: newUser.subscription,
                    avatarURL: newUser.avatarURL,
                    verify: newUser.verify
                }
            })
        } else {
            res.status(409).json({ message: 'Email in use' })
        }

    } catch (err) {
        fs.unlink(avatarURL)
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const loginUser = await userFuncs.login({ email, password })

        if (!loginUser) {
            res.status(401).json({ message: 'Email or password is wrong' })
        } else if (loginUser.message) {
            res.status(400).json({ message: 'Unverified' })
        } else {
            res.json({
                message: "User loged in",
                token: loginUser.token,
                user: {
                    email: loginUser.email,
                    subscription: loginUser.subscription,
                    avatarURL: loginUser.avatarURL
                }
            })
        }

    } catch (err) {
        next(err)
    }
}

const logout = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const logedOutOuser = await userFuncs.logout(_id)
        if (logedOutOuser) {
            res.status(204).json({})
        } else {
            res.status(401).json({
                message: 'Unauthorized'
            });
        }

    } catch (err) {
        next(err)
    }
}

const current = async (req, res, next) => {
    try {
        const { _id } = req.user;

        const currentOuser = await userFuncs.getCurrent(_id)
        if (currentOuser) {
            res.json({
                message: "Success",
                user: {
                    email: currentOuser.email,
                    subscription: currentOuser.subscription
                }
            })
        } else {
            res.status(401).json({
                message: 'Unauthorized'
            });
        }

    } catch (err) {
        next(err)
    }
}

const newSub = async (req, res, next) => {
    try {
        const { _id } = req.user
        const { subscription } = req.body;

        const updatedSub = await userFuncs.changeSub(_id, subscription)
        if (updatedSub) {
            res.json({ message: 'Subscription updated', data: { subscription: updatedSub.subscription } })
        } else {
            res.status(404).json({ message: 'Not found' })
        }
    } catch (err) {
        next(err)
    }
}

const updateAvatar = async (req, res, next) => {
    try {
        const { _id } = req.user
        if (req.file === undefined) {
            return res.status(400).json({ message: 'Missing required file' })
        }
        const { path: tempDir, filename } = req.file
        await adjust(tempDir)

        const uniqueFilename = `${_id}_${filename}`
        const publicDir = path.join(__dirname, '..', 'public', 'avatars', uniqueFilename)
        await fs.rename(tempDir, publicDir)
        const avatarURL = path.join('avatars', uniqueFilename)

        const updatedAva = await userFuncs.updateAvatar(_id, avatarURL)
        if (updatedAva) {
            res.json({ message: 'Avatar updated', data: { avatarURL: updatedAva.avatarURL } })
        } else {
            res.status(404).json({ message: 'Not found' })
        }
    } catch (err) {
        next(err)
    }
}

const verify = async (req, res, next) => {
    try {
        const { verificationToken } = req.params

        const verifiedUser = await userFuncs.verify(verificationToken)
        if (!verifiedUser) {
            res.status(404).json({ message: 'Not found' })
        } else if (verifiedUser.message) {
            res.status(400).json({ message: 'Verification has already been passed' })
        } else {
            res.json({ message: 'Verification successful' })
        }
    } catch (err) {
        next(err)
    }
}

const sendVerification = async (req, res, next) => {
    try {
        const { email } = req.body

        const verifiedUser = await userFuncs.sendVerification(email)
        if (!verifiedUser) {
            res.status(404).json({ message: 'Not found' })
        } else if (verifiedUser.message) {
            res.status(400).json({ message: 'Verification has already been passed' })
        } else {
            res.json({ message: 'Verification email sent' })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = { register, login, logout, current, newSub, updateAvatar, verify, sendVerification }
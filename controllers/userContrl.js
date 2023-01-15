const { userFuncs } = require('../service')
const gravatar = require('gravatar')
const path = require('path')
const fs = require('fs').promises
const Jimp = require('jimp');

const register = async (req, res, next) => {
    let avatarURL = null
    try {
        const { email, password } = req.body;

        if (req.file === undefined) {
            avatarURL = gravatar.url(email)
        } else {
            const { path: tempDir, filename } = req.file
            await Jimp.read(tempDir)
                .then(async image => {
                    await image
                        .resize(250, 250)
                        .writeAsync(tempDir)
                })
                .catch(err => {
                    next(err);
                });
            const publicDir = path.join(__dirname, '..', 'public', 'avatars', filename)
            await fs.rename(tempDir, publicDir)
            avatarURL = path.join('avatars', filename)
        }
        console.log(avatarURL)

        const newUser = await userFuncs.register({ email, password, avatarURL })

        if (newUser) {
            res.status(201).json({
                message: "User created",
                user: {
                    email: newUser.email,
                    subscription: newUser.subscription,
                    avatarURL: newUser.avatarURL
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
        console.log(req.body)
        const { email, password } = req.body;

        const loginUser = await userFuncs.login({ email, password })

        if (loginUser) {
            res.json({
                message: "User loged in",
                token: loginUser.token,
                user: {
                    email: loginUser.email,
                    subscription: loginUser.subscription,
                    avatarURL: loginUser.avatarURL
                }
            })
        } else {
            res.status(401).json({ message: 'Email or password is wrong' })
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
        await Jimp.read(tempDir)
            .then(async image => {
                await image
                    .resize(250, 250)
                    .writeAsync(tempDir)
            })
            .catch(err => {
                next(err);
            });
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
module.exports = { register, login, logout, current, newSub, updateAvatar }
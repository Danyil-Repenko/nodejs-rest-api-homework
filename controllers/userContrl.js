const { userFuncs } = require('../service')

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const newUser = await userFuncs.register({ email, password })

        if (newUser) {
            res.status(201).json({
                message: "User created",
                user: {
                    email: newUser.email,
                    subscription: newUser.subscription
                }
            })
        } else {
            res.status(409).json({ message: 'Email in use' })
        }

    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const loginUser = await userFuncs.login({ email, password })

        if (loginUser) {
            res.json({
                message: "User loged in",
                token: loginUser.token,
                user: {
                    email: loginUser.email,
                    subscription: loginUser.subscription
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
module.exports = { register, login, logout, current, newSub }
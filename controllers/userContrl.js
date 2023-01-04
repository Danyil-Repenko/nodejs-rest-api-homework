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

module.exports = { register, login }
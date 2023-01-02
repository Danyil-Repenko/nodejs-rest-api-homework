const { userFuncs } = require('../service/index')
const { User } = require('../shemas/user')

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const alreadyUser = User.findOne({ email })
        if (alreadyUser) {
            return res.status(409).json({ message: "Email in use" })
        }

        const newUser = await userFuncs.register({ email, password })
        res.status(201).json({
            message: "User created",
            user: {
                email: newUser.email,
                subscription: newUser.subscription
            }
        })
    } catch (err) {
        next(err)
    }
}

module.exports = { register }
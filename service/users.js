const { User } = require('../shemas/user')
const bcrypt = require('bcryptjs');

const register = async ({ email, password }) => {
    const saltedPassword = await bcrypt.hash(password, 10)
    return User.create({ email, password: saltedPassword })
}

const login = (fields) => {

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
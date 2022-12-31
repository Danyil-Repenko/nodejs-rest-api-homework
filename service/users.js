const { User } = require('../shemas/user')

const register = (fileds) => {
    return User.create(fileds)
}

const login = (fileds) => {

}

const logout = (fileds) => {

}

const getCurrent = (fileds) => {

}

module.exports = {
    register,
    login,
    logout,
    getCurrent
}
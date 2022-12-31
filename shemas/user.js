const mongoose = require('mongoose')
const Joi = require('joi');

const emailRegExp = /^ ([a - zA - Z0 -9_ -\\.] +)@((\\[[0 - 9]{ 1, 3}\\.[0 - 9]{ 1, 3}\\.[0 - 9]{ 1, 3}\\.)| (([a - zA - Z0 - 9\\-] +\\.) +)) ([a - zA - Z]{ 2, 4} | [0 - 9]{ 1, 3}) (\\] ?) $/;

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: emailRegExp,
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: String
}, {
    versionKey: false
})

const schema = Joi.object({
    password: Joi.string()
        .required()
        .min(6),
    email: Joi.string()
        .required()
        .pattern(emailRegExp),
    subscription: Joi.string().valid('starter', 'pro', 'business'),
    token: Joi.string()
})

const User = mongoose.model('user', userSchema)

module.exports = { User, schema };
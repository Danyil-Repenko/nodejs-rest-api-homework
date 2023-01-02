const mongoose = require('mongoose')
const Joi = require('joi');
const { mongooseServerError } = require('../heplers')

// eslint-disable-next-line no-useless-escape
const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

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

userSchema.post('save', mongooseServerError)

const addUserSchema = Joi.object({
    password: Joi.string()
        .required()
        .min(6),
    email: Joi.string()
        .required()
        .pattern(emailRegExp),
    subscription: Joi.string().valid('starter', 'pro', 'business'),
    token: Joi.any().valid(Joi.string(), null)
})

const schemas = { addUserSchema }

const User = mongoose.model('user', userSchema)

module.exports = { User, schemas };
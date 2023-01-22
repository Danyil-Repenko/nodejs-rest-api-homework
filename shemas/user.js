const mongoose = require('mongoose')
const Joi = require('joi');
const mongooseServerError = require('../helpers/mongooseServerError')

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
    avatarURL: String,
    token: {
        type: String,
        default: null
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
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
    subscription: Joi.string().valid('starter', 'pro', 'business')
})

const loginUserSchema = Joi.object({
    password: Joi.string()
        .required()
        .min(6),
    email: Joi.string()
        .required()
        .pattern(emailRegExp)
})

const sendVerificationUserSchema = Joi.object({
    email: Joi.string()
        .required()
        .pattern(emailRegExp)
})

const changeSubSchema = Joi.object({
    subscription: Joi.string().required().valid('starter', 'pro', 'business'),
})

const schemas = { addUserSchema, loginUserSchema, changeSubSchema, sendVerificationUserSchema }

const User = mongoose.model('user', userSchema)

module.exports = { User, schemas };
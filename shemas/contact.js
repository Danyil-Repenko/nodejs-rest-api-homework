const mongoose = require('mongoose');
const Joi = require('joi');

const nameRegExp =
    /[a - zA - Zа - яА - Я] + (([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const emailRegExp = /^ ([a - zA - Z0 -9_ -\\.] +)@((\\[[0 - 9]{ 1, 3}\\.[0 - 9]{ 1, 3}\\.[0 - 9]{ 1, 3}\\.)| (([a - zA - Z0 - 9\\-] +\\.) +)) ([a - zA - Z]{ 2, 4} | [0 - 9]{ 1, 3}) (\\] ?) $/;
const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const contactsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
        match: nameRegExp
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Set email for contact'],
        match: emailRegExp
    },
    phone: {
        type: String,
        required: [true, 'Set phone for contact'],
        match: phoneRegExp
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
    }
}, {
    versionKey: false
})

const addSchema = Joi.object({
    name: Joi.string()
        .pattern(nameRegExp)
        .required(),
    email: Joi.string()
        .pattern(emailRegExp)
        .required(),
    phone: Joi.string()
        .pattern(phoneRegExp)
        .required(),
    favorite: Joi.bool(),
})

const updateSchema = Joi.object({
    name: Joi.string()
        .pattern(nameRegExp),
    email: Joi.string()
        .pattern(emailRegExp),
    phone: Joi.string()
        .pattern(phoneRegExp),
})

const updateStatusSchema = Joi.object({
    favorite: Joi.bool().required(),
})

const schemas = { addSchema, updateSchema, updateStatusSchema }

const Contact = mongoose.model('contact', contactsSchema)

module.exports = { Contact, schemas }
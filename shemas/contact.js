/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
const Joi = require('joi');
const { mongooseServerError } = require('../heplers')

const namePatern =
    /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const emailPatern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phonePatern =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

const contactsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
        match: namePatern
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Set email for contact'],
        match: emailPatern
    },
    phone: {
        type: String,
        required: [true, 'Set phone for contact'],
        match: phonePatern
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

contactsSchema.post('save', mongooseServerError)

const addSchema = Joi.object({
    name: Joi.string()
        .pattern(namePatern)
        .required(),
    email: Joi.string()
        .pattern(emailPatern)
        .required(),
    phone: Joi.string()
        .pattern(phonePatern)
        .required(),
    favorite: Joi.bool().default(false),
})

const updateSchema = Joi.object({
    name: Joi.string()
        .pattern(namePatern),
    email: Joi.string()
        .pattern(emailPatern),
    phone: Joi.string()
        .pattern(phonePatern),
})

const updateStatusSchema = Joi.object({
    favorite: Joi.bool().required(),
})

const schemas = { addSchema, updateSchema, updateStatusSchema }

const Contact = mongoose.model('contact', contactsSchema)

module.exports = { Contact, schemas }
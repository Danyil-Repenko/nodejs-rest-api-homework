const Joi = require('joi');
const Contact = require('../shemas/contact')

const listContacts = async () => {
    return Contact.find()
}

const getContactById = async (contactId) => {
    return Contact.findById(contactId) || null
}

const removeContact = async (contactId) => {
    return Contact.findByIdAndDelete(contactId) || null
}

const namePatern =
    "[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";
const phonePatern =
    '^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$';

const schema = Joi.object({
    name: Joi.string()
        .pattern(new RegExp(namePatern))
        .allow(''),
    email: Joi.string()
        .email()
        .allow(''),
    phone: Joi.string()
        .pattern(new RegExp(phonePatern))
        .allow(''),
    favorite: Joi.bool()
})

const addContact = async (fields) => {
    console.log(fields)
    const validatedValues = schema.validate(fields)
    if (validatedValues.error) return { valid: null }
    return Contact.create(fields)
}

const updateContact = async (contactId, fields) => {
    const validatedValues = schema.validate(fields)
    if (validatedValues.error) return { valid: null }
    return Contact.findByIdAndUpdate(contactId, fields, { new: true }) || null
}

const updateContactStatus = (contactId, status) => {
    return Contact.findByIdAndUpdate(contactId, { $set: { favorite: status } }) || null

}
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateContactStatus,
}
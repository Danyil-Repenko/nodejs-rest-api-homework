const { Contact } = require('../shemas/contact')

const listContacts = () => {
    return Contact.find()
}

const getContactById = (contactId) => {
    return Contact.findById(contactId)
}

const removeContact = (contactId) => {
    return Contact.findByIdAndDelete(contactId)
}

const addContact = (fields) => {
    return Contact.create(fields)
}

const updateContact = (contactId, fields) => {
    return Contact.findByIdAndUpdate(contactId, fields, { new: true })
}

const updateContactStatus = (contactId, status) => {
    return Contact.findByIdAndUpdate(contactId, { $set: { favorite: status } })

}
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateContactStatus,
}
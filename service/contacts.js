const { Contact } = require('../shemas/contact')

const listContacts = async (ownerId, params) => {
    const { page = 1, limit = 5, favorite } = params
    const skip = (page - 1) * limit
    if (favorite === undefined) {
        return await Contact.find({ owner: ownerId }, undefined, { skip, limit })
    }
    return await Contact.find({ owner: ownerId, favorite }, undefined, { skip, limit })
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
const contactFuncs = require('../service')

const get = async (req, res, next) => {
    try {
        const contacts = await contactFuncs.listContacts()
        if (contacts) {
            res.json(
                { message: 'Success', code: 200, data: contacts })
        } else {
            res.status(404).json({ message: 'Not found' })
        }

    } catch (err) {
        console.log(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contactById = await contactFuncs.getContactById(contactId)
        if (contactById) {
            res.json({ message: 'Success', code: 200, data: contactById })
        } else { res.status(404).json({ message: 'Not found' }) }
    } catch (err) {
        console.log(err)
    }
}

const create = async (req, res, next) => {
    try {
        const { name, email, phone, favorite } = req.body
        if (name === undefined || email === undefined || phone === undefined) {
            res.status(400).json({ message: 'Missing required field', code: 400 })
            return
        }
        const newContact = await contactFuncs.addContact({ email, name, phone, favorite })
        if (newContact.valid === null) {
            res.status(400).json({ message: 'Unvalid field', code: 400 })
        } else {
            res.status(201).json({ message: 'Contact added', code: 201, data: newContact })
        }
    } catch (err) {
        console.log(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const deletedContact = await contactFuncs.removeContact(contactId)

        if (deletedContact) {
            res.json({ message: 'Contact deleted', code: 200, data: deletedContact })
        } else {
            res.status(404).json({ message: 'Not found' })
        }
    } catch (err) {
        console.log(err)
    }
}

const edit = async (req, res, next) => {
    try {
        const { contactId } = req.params
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({ message: 'Missing fields', code: 400 })
            return
        }

        const updatedContact = await contactFuncs.updateContact(contactId, req.body)

        if (updatedContact) {
            res.json({ message: 'Contact updated', code: 200, data: updatedContact })
        } else if (updatedContact.valid === null) {
            res.status(400).json({ message: 'Unvalid field', code: 400 })
        } else { res.status(404).json({ message: 'Not found' }) }
    } catch (err) {
        console.log(err)
    }
}

const updateStatus = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const { favorite } = req.body;
        if (!favorite) {
            res.status(400).json({ message: 'Missing field favorite', code: 400 });
            return
        }

        const updatedStatus = await contactFuncs.updateContactStatus(contactId, favorite)
        if (updateStatus) {
            res.json({ message: 'Status updated', code: 200, data: updatedStatus })
        } else {
            res.status(404).json({ message: 'Not found' })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    get,
    getById,
    create,
    remove,
    edit,
    updateStatus
}
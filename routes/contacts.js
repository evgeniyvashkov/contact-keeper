const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');

//@route    GET api/contacts
//@desc     Get all contacts
//@access   private
router.get('/', auth, async (req, res) => {
    try {
        const contactsList = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contactsList);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//@route    POST api/contacts
//@desc     Add contact
//@access   private
router.post('/', [auth, [
    check('name', 'Name is required.').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    const { name, phone, email, type } = req.body;

    try {
        const newContact = new Contact({ name, phone, email, type, user: req.user.id });
        const contact = await newContact.save();
        res.json(contact);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Server Error' });
    }
})

//@route    PUT api/contacts/:id
//@desc     Update contact
//@access   private
router.put('/:id', auth, async (req, res) => {
    const contactFields = {};
    const { name, email, phone, type } = req.body;
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ message: 'Contact not found.' });

        //Make sure owns contactr
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Server Error' });
        };

        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields },
            { new: true }
        );

        res.json(contact);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Server Error' });
    }
});

//@route    DELETE api/contacts/:id
//@desc     Delete contact
//@access   private
router.delete('/:id', auth, async (req, res) => {
    try {
        const contactToDelete = await Contact.findById(req.params.id);
        if (!contactToDelete) return res.status(404).json({ message: 'Contact not found' });

        if (req.user.id !== contactToDelete.user.toString()) return res.status(401).json({ message: 'Not authorized' });

        await Contact.findByIdAndRemove(req.params.id);

        res.json({ message: 'Contact removed.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' })
    }
});

module.exports = router;
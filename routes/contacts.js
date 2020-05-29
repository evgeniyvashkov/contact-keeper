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
router.post('/', (req, res) => {
    res.send('Add contact')
})

//@route    PUT api/contacts/:id
//@desc     Update contact
//@access   private
router.put('/:id', (req, res) => {
    res.send('Update contact')
});

//@route    DELETE api/contacts/:id
//@desc     Delete contact
//@access   private
router.delete('/:id', (req, res) => {
    res.send('Delete contact')
});

module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

//@route    POST api/users
//@desc     Register a user
//@access   Public
router.post('/', [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please add valid email').isEmail(),
    check('password', 'Password should be 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.send(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword });

        await user.save();

        return res.send('User created successful');

    } catch (error) {
        console.log(error);
        return res.status(500).send('Server internal error');
    };
});

module.exports = router;
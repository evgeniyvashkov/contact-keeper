const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

//@route    get api/auth
//@desc     get logged  in user
//@access   Private
router.get('/', (req, res) => {
    res.send('Get logged in user')
});

//@route    post api/auth
//@desc     Auth user & get token
//@access   Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please is required').exists(),
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                res.status(400).json({ message: 'Invalid Credentials' });
            };

            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (!isPasswordMatch) {
                res.status(400).json({ message: 'Invalid Credentials' });
            };

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 360000
            }, (error, token) => {
                if (error) throw error;
                res.json({ token })
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: 'Server Error' });
        }
    });

module.exports = router;
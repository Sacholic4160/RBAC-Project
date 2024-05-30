const user = require('../models/user.model.js')
const { validationResult } = require('express-validator')
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyJWT = require('../middleware/auth.middleware.js');
const { ResultWithContextImpl } = require('express-validator/lib/chain/context-runner-impl.js');

const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!(errors.isEmpty())) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            })
        }

        const { name, email, password } = req.body;
        const isExistedUser = await user.findOne({ email });
        if (isExistedUser) {
            return res.status(200).json({
                success: false,
                msg: 'Email already existed'
            })
        }

        const hashedPassword = await bcrpyt.hash(password, 10);

        const User = new user({
            name,
            email,
            password: hashedPassword
        });
        const userData = await User.save();

        return res.status(200).json({
            success: true,
            msg: 'User registered successfully!',
            data: userData
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
            error: error
        });
    }
}

const generateAccessToken = async (user) => {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
    return token;
}

const loginUser = async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!(errors.isEmpty())) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                error: errors.array()
            })
        }

        const { email, password } = req.body;
        const userData = await user.findOne({
            email
        })

        if (!(userData)) {
            return res.status(400).json({
                success: false,
                msg: 'Email & Password is incorrect!'
            })
        }

        const isPasswordCorrect = await bcrpyt.compare(password, userData.password);

        if (!isPasswordCorrect) {
            return res.status(200).json({
                success: false,
                msg: 'Email & Password is incorrect!'
            })
        }

        const accessToken = await generateAccessToken({ user: userData })

        return res.status(200).json({
            success: true,
            msg: 'User logged in successfully!',
            accessToken: accessToken,
            tokenType: 'Bearer',
            data: userData,
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

const getProfile = async (req, res) => {
    try {




        return res.status(200).json({
            success: true,
            msg: 'Profile Fetched Successfully!',
            data: (req.user)
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}


module.exports = { registerUser, loginUser, getProfile }
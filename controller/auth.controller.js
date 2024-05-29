const user = require('../models/user.model.js')
const { validationResult } = require('express-validator')

const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!(errors.isEmpty())) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array();
            })
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
            error: error
        });
    }
}


module.exports = { registerUser }
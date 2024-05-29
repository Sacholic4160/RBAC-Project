const { check } = require('express-validator');

const registerValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please provide a valid Email').not().isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    check('password', 'password is required').not().isEmpty(),

]

module.exports = {
    registerValidator
}
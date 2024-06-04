const { check } = require('express-validator');

const registerValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please provide a valid Email').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    check('password', 'password is required').not().isEmpty(),

]
const loginValidator = [
    check('email', 'Please provide a valid Email').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    check('password', 'password is required').not().isEmpty(),

]

//........user creation validation manually
const userCreateValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please provide a valid Email').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),

]

module.exports = {
    registerValidator,
    loginValidator,
    userCreateValidator
}
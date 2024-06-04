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
const userUpdateValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('id', 'Please provide a valid id').not().isEmail()

]

const userDeleteValidator = [
    check('id','id is required').not().isEmpty()
]

module.exports = {
    registerValidator,
    loginValidator,
    userCreateValidator,
    userUpdateValidator,
    userDeleteValidator
}
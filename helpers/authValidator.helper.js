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

const postLikeAndUnlikeValidator = [
    check('user_id', 'user_id is required').not().isEmpty(),
    check('post_id', 'Please provide a valid post_id').not().isEmpty()

]

const postLikeCountValidator = [
    check('post_id','post_id is required').not().isEmpty()
]

module.exports = {
    registerValidator,
    loginValidator,
    userCreateValidator,
    userUpdateValidator,
    userDeleteValidator,
    postLikeAndUnlikeValidator,
    postLikeCountValidator
}
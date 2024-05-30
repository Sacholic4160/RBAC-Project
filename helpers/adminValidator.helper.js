const { check } = require('express-validator');

const permissionAddValidator = [
    check('permission_name', 'Permission Name is required!').not().isEmpty(),
]

const permissionDeleteValidator = [
    check('id', 'ID is required!').not().isEmpty(),
]

const permissionupdateValidator = [
    check('id', 'ID is required!').not().isEmpty(),
]


module.exports = { permissionAddValidator, permissionDeleteValidator, permissionupdateValidator }
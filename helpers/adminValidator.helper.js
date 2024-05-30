const { check } = require('express-validator');

const permissionAddValidator = [
    check('permission_name', 'Permission Name is required!').not().isEmpty(),
]

module.exports = { permissionAddValidator }
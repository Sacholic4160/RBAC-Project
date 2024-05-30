const { check } = require('express-validator');

const permissionAddValidator = [
    check('permission_name', 'permission_name is required!').not().isEmpty(),
]

const permissionDeleteValidator = [
    check('id', 'id is required!').not().isEmpty(),
]

const permissionUpdateValidator = [
    check('id', 'id is required!').not().isEmpty(),
    check('permission_name', 'permission_name is required!').not().isEmpty(),
]


const categoryAddValidator = [
    check('category_name', 'category_name is required!').not().isEmpty(),
]

const categoryUpdateValidator = [
    check('id', 'id is required!').not().isEmpty(),
    check('category_name', 'category_name is required!').not().isEmpty(),
]

const categoryDeleteValidator = [
    check('id', 'id is required!').not().isEmpty(),
]


module.exports = { permissionAddValidator, permissionDeleteValidator, permissionUpdateValidator, categoryAddValidator, categoryUpdateValidator, categoryDeleteValidator }
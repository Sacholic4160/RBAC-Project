const { check } = require('express-validator');

//............... ADMIN VALIDATORS................................
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

//...............category validators.......................................
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


//.............Post Validators....................................

const postCreateValidator = [
    check('title', 'title is required!').not().isEmpty(),
    check('description', 'description is required!').not().isEmpty(),
    //check('category', 'category is required!').not.isEmpty(),
]

const postUpdateValidator = [
    check('title', 'title is required!').not().isEmpty(),
    check('description', 'description is required!').not().isEmpty(),
    // check('category', 'category is required!').not.isEmpty(),
    check('id', 'id is required!').not().isEmpty(),

]


const postDeleteValidator = [
    check('id', 'id is required!').not().isEmpty(),
]

//...........role validator.....................................
const setRoleValidator = [
    check('roleName', 'role name is required!').not().isEmpty(),
    check('value', 'role value is required').not().isEmpty()
]


//...........route validator.....................................
const addOrUpdateRouteValidator = [
    check('router_endpoint', 'router_endpoint is required!').not().isEmpty(),
    check('role', 'role is required').not().isEmpty(),
    check('permission', 'permission must be an array!').isArray(),
]

module.exports = { permissionAddValidator, permissionDeleteValidator, permissionUpdateValidator, categoryAddValidator, categoryUpdateValidator, categoryDeleteValidator, postCreateValidator, postUpdateValidator, postDeleteValidator, setRoleValidator, addOrUpdateRouteValidator}
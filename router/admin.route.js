const express = require('express')

const router = express();
const verifyJWT = require('../middleware/auth.middleware.js');

const { permissionAddValidator, permissionDeleteValidator, permissionupdateValidator } = require('../helpers/adminValidator.helper.js');
const { addPermission, getPermission, updatePermission, deletePermission } = require('../controller/admin/permission.controller.js');


router.post('/add-permission-byAdmin', verifyJWT, permissionAddValidator, addPermission)
router.get('/get-permission-byAdmin', verifyJWT, getPermission)
router.post('/update-permission-byAdmin', verifyJWT, permissionupdateValidator, updatePermission)
router.delete('/delete-permission-byAdmin', verifyJWT, permissionDeleteValidator, deletePermission)

module.exports = router;
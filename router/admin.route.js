const express = require('express')

const router = express();
const verifyJWT = require('../middleware/auth.middleware.js');
const onlyAdminAccess = require('../middleware/admin.middleware.js');

const { permissionAddValidator, permissionDeleteValidator, permissionUpdateValidator } = require('../helpers/adminValidator.helper.js');
const { addPermission, getPermission, updatePermission, deletePermission } = require('../controller/admin/permission.controller.js');


router.post('/add-permission-byAdmin', verifyJWT, onlyAdminAccess, permissionAddValidator, addPermission)
router.get('/get-permission-byAdmin', verifyJWT, onlyAdminAccess, getPermission)
router.post('/update-permission-byAdmin', verifyJWT, onlyAdminAccess, permissionUpdateValidator, updatePermission)
router.delete('/delete-permission-byAdmin', verifyJWT, onlyAdminAccess, permissionDeleteValidator, deletePermission)

module.exports = router;
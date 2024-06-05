const express = require('express')

const router = express();
const verifyJWT = require('../middleware/auth.middleware.js');
const onlyAdminAccess = require('../middleware/admin.middleware.js');

const { permissionAddValidator, permissionDeleteValidator, permissionUpdateValidator, setRoleValidator,addOrUpdateRouteValidator, getRouteValidator } = require('../helpers/adminValidator.helper.js');

const { addPermission, getPermission, updatePermission, deletePermission } = require('../controller/admin/permission.controller.js');
const { setRole, getRole } = require('../controller/admin/role.controller.js');
const { addOrUpdateRouterPermission,getRouterPermission } = require('../controller/admin/router.controller.js')


//.................ADMIN Permission route................................................................
router.post('/add-permission-byAdmin', verifyJWT, onlyAdminAccess, permissionAddValidator, addPermission)
router.get('/get-permission-byAdmin', verifyJWT, onlyAdminAccess, getPermission)
router.post('/update-permission-byAdmin', verifyJWT, onlyAdminAccess, permissionUpdateValidator, updatePermission)
router.delete('/delete-permission-byAdmin', verifyJWT, onlyAdminAccess, permissionDeleteValidator, deletePermission)


//...................role get and set route...................................
router.post('/set-role', verifyJWT, onlyAdminAccess, setRoleValidator, setRole)
router.get('/get-role', verifyJWT, onlyAdminAccess, getRole)

//router permission by admin route
router.post('/addOrUpdate-routerPermissions',verifyJWT,onlyAdminAccess,addOrUpdateRouteValidator,addOrUpdateRouterPermission)
router.get('/router-Permissions',verifyJWT,onlyAdminAccess,getRouteValidator,getRouterPermission)



module.exports = router;
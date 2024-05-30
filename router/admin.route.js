const express = require('express')

const router = express();

const { permissionAddValidator, } = require('../helpers/adminValidator.helper.js');
const { addPermission } = require('../controller/admin/permission.controller.js');


router.post('/add-permission', permissionAddValidator, addPermission)

module.exports = router;
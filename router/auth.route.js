const express = require('express')

const router = express();
const verifyJWT = require('../middleware/auth.middleware.js');
const { registerUser, loginUser, getProfile , getUserPermissions} = require('../controller/auth.controller.js');
const { registerValidator, loginValidator, } = require('../helpers/authValidator.helper.js');

router.post('/register', registerValidator, registerUser)
router.post('/login', loginValidator, loginUser)

router.get('/profile', verifyJWT, getProfile)


router.get('/refresh-permissions',verifyJWT, getUserPermissions)


module.exports = router;
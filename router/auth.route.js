const express = require('express')

const router = express();
const verifyJWT = require('../middleware/auth.middleware.js');
const { registerUser, loginUser, getProfile } = require('../controller/auth.controller.js');
const { registerValidator, loginValidator, } = require('../helpers/authValidator.helper.js');


router.post('/register', registerValidator, registerUser)
router.post('/login', loginValidator, loginUser)

router.get('/profile', verifyJWT, getProfile)


module.exports = router;
const express = require('express')

const router = express();

const { registerUser, loginUser } = require('../controller/auth.controller.js');
const { registerValidator, loginValidator } = require('../helpers/validator.helper.js');


router.post('/register', registerValidator, registerUser)
router.post('/login', loginValidator, loginUser)
module.exports = router;
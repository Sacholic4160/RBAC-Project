const express = require('express')

const router = express();

const { registerUser } = require('../controller/auth.controller.js');
const { registerValidator } = require('../helpers/validator.helper.js');


router.post('/register', registerValidator, registerUser)
module.exports = router;
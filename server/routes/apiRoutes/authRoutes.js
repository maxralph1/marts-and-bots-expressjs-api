const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/authControllers/registerController');
const loginController = require('../../controllers/authControllers/loginController');


router.post('/login', loginController.loginUser);
router.post('/register', registerController.registerUser);


module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');


router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

router.get('/:id', userController.getUser);


module.exports = router;
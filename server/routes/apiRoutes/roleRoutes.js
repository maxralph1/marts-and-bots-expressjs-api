const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/roleController');


router.route('/')
    .get(roleController.getAllRoles)
    .post(roleController.createRole);

router.route('/:id')
    .get(roleController.getRole)
    .put(roleController.updateRole)
    .delete(roleController.deleteRole);


module.exports = router;
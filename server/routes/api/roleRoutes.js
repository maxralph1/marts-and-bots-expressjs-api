const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/roleController');


router.route('/')
    .get(roleController.getAllRoles)
    .post(roleController.createRole)
    .put(roleController.updateRole)
    .delete(roleController.deleteRole);

router.get('/:id', roleController.getRole);


module.exports = router;
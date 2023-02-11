const express = require('express');
const router = express.Router();
const productInstanceController = require('../../controllers/productInstanceController');


router.route('/')
    .get(productInstanceController.getAllProductInstances)
    .post(productInstanceController.createProductInstance)
    .put(productInstanceController.updateProductInstance)
    .delete(productInstanceController.deleteProductInstance);

router.get('/:id', productInstanceController.getProductInstance);


module.exports = router;
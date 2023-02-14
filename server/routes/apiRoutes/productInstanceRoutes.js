const express = require('express');
const router = express.Router();
const productInstanceController = require('../../controllers/productInstanceController');


router.route('/')
    .get(productInstanceController.getAllProductInstances)
    .post(productInstanceController.createProductInstance);

router.get('/:slug')
    .get(productInstanceController.getProductInstance)
    .put(productInstanceController.updateProductInstance)
    .delete(productInstanceController.deleteProductInstance);


module.exports = router;
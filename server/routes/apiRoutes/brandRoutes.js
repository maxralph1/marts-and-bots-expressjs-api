const express = require('express');
const router = express.Router();
const brandController = require('../../controllers/brandController');
const verifyJWT = require('../../middlewares/verifyJWT');
// const rolesList = require('../../config/rolesList')


router.route('/')
    .get(brandController.getAllBrands)
    .post(verifyJWT, brandController.createBrand);

router.route('/:code')
    .get(brandController.getBrand)
    .put(verifyJWT, brandController.updateBrand)
    .delete(verifyJWT, brandController.deleteBrand);


module.exports = router;
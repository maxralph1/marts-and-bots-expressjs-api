const express = require('express');
const router = express.Router();
const couponController = require('../../controllers/couponController');


router.route('/')
    .get(couponController.getAllCoupons)
    .post(couponController.createCoupon)
    .put(couponController.updateCoupon)
    .delete(couponController.deleteCoupon);

router.get('/:id', couponController.getCoupon);


module.exports = router;
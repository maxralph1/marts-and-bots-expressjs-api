const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/paymentController');


router.route('/')
    .get(paymentController.getAllPayments)
    .post(paymentController.createPayment);

router.route('/:ref')
    .get(paymentController.getPayment)
    .put(paymentController.updatePayment)
    .delete(paymentController.deletePayment);


module.exports = router;
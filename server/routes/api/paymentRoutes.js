const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/paymentController');


router.route('/')
    .get(paymentController.getAllPayments)
    .post(paymentController.createPayment)
    .put(paymentController.updatePayment)
    .delete(paymentController.deletePayment);

router.get('/:id', paymentController.getPayment);


module.exports = router;
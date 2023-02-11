const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/orderController');


router.route('/')
    .get(orderController.getAllOrders)
    .post(orderController.createOrder)
    .put(orderController.updateOrder)
    .delete(orderController.deleteOrder);

router.get('/:id', orderController.getOrder);


module.exports = router;
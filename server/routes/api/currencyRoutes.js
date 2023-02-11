const express = require('express');
const router = express.Router();
const currencyController = require('../../controllers/currencyController');


router.route('/')
    .get(currencyController.getAllCurrencies)
    .post(currencyController.createCurrency)
    .put(currencyController.updateCurrency)
    .delete(currencyController.deleteCurrency);

router.get('/:id', currencyController.getCurrency);


module.exports = router;
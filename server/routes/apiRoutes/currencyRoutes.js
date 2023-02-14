const express = require('express');
const router = express.Router();
const currencyController = require('../../controllers/currencyController');


router.route('/')
    .get(currencyController.getAllCurrencies)
    .post(currencyController.createCurrency);

router.route('/:id')
    .get( currencyController.getCurrency)
    .put(currencyController.updateCurrency)
    .delete(currencyController.deleteCurrency);


module.exports = router;
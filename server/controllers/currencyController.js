const Currency = require('../models/Currency');
const { body, validationResult } = require('express-validator');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');



const getAllCurrencies = async (req, res) => {
  const currencies = await Currency.find().sort('-created_at');
  if ((!currencies) || (currencies.length < 1)) return res.status(404).json({ "message": "No currencies found" });
  res.json(currencies);
};


const getCurrency = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "Accurate currency ID required" });

  const currency = await Currency.findOne({ _id: req.params.id }).exec();
  if (!currency) {
    return res.status(404).json({ "message": `No currency matches the currency ID ${req.params.id}` });
  }
  res.json(currency);
};


const createCurrency = [
  body('code')
      .trim()
      .isLength({ min: 3, max: 3 })
      .withMessage('Currency code must be exactly 3 characters long.')
      .escape(),
  body('sign')
      .trim()
      .isLength({ min: 1, max: 10 })
      .withMessage('Currency sign must be less than 10 characters long.')
      .escape(),
  body('html_sign')
      .trim()
      .isLength({ min: 1, max: 10 })
      .withMessage('Currency code must be less than 10 characters long.')
      .escape(),
  body('name')
      .trim()
      .isLength({ min: 3, max: 35 })
      .withMessage('Currency code must be between 3-35 characters long.')
      .escape()
      ,
  async (req, res) => {
    if (req.body?.code) req.body.code;
    if (req.body?.sign) req.body.sign;
    if (req.body?.html_sign) req.body.html_sign;
    if (req.body?.name) req.body.name;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const duplicateCurrency = await Currency.findOne({ code: req.body.code, sign: req.body.sign, html_sign: req.body.html_sign }).exec();
    if (duplicateCurrency) {
      return res.status(409).json({ "message": `Currency ${duplicateCurrency} already exists` });
    };

    const currency = await new Currency({
      code: req.body.code,
      sign: req.body.sign,
      html_sign: req.body.html_sign,
      name: req.body.name
    });

    currency.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(201).json(currency);
    });
  }
];


const updateCurrency = [
  body('code')
      .trim()
      .isLength({ min: 3, max: 3 })
      .withMessage('Currency code must be exactly 3 characters long.')
      .escape(),
  body('sign')
      .trim()
      .isLength({ min: 1, max: 10 })
      .withMessage('Currency sign must be less than 10 characters long.')
      .escape(),
  body('html_sign')
      .trim()
      .isLength({ min: 1, max: 10 })
      .withMessage('Currency code must be less than 10 characters long.')
      .escape(),
  body('name')
      .trim()
      .isLength({ min: 3, max: 35 })
      .withMessage('Currency code must be between 3-35 characters long.')
      .escape()
  ,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const currency = await Currency.findOne({ _id: req.params.id }).exec();
    if (!currency) {
      return res.status(404).json({ "message": `The specified currency ${req.body.currency} does not match our records` });
    };
    if (req.body?.code) currency.code = req.body.code;
    if (req.body?.sign) currency.sign = req.body.sign;
    if (req.body?.html_sign) currency.html_sign = req.body.html_sign;
    if (req.body?.name) currency.name = req.body.name;

    const result = await currency.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    });
  }
];


const deleteCurrency = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "Accurate currency required" });

  const currency = await Currency.findOne({ _id: req.params.id }).exec();
  if (!currency) {
    return res.status(404).json({ "message": `No currency matches ${req.params.id}` });
  }
  const result = await currency.deleteOne();
  res.json(result);
};



module.exports = {
 getAllCurrencies,
 getCurrency,
 createCurrency,
 updateCurrency,
 deleteCurrency
};
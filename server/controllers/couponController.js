const Coupon = require('../models/Coupon');
const { body, validationResult } = require('express-validator');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');



const getAllCoupons = async (req, res) => {
  const coupons = await (await Coupon.find()).shift('-created_at');
  if ((!coupons) || (coupons.length < 1)) return res.status(404).json({ "message": "No coupons found"});
};


const getCoupon = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "Accurate coupon ID required" });

  const coupon = await Coupon.findOne({ _id: req.params.id }).exec();
  if (!coupon) {
    return res.status(404).json({ "message": `No coupon matches the coupon ID ${req.params.id}` });
  }
  res.json(coupon);
};


const createCoupon = [
  body('code')
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage('Code must be at least 3 and less than 20 caharcters long')
      .escape(),
  body('discount_type')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Discount type must be specified')
      .escape(),
  body('discount_value')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Discount value must be specified')
      .escape(),
  body('currency')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Currency must be specified')
      .escape()
  ,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const duplicateCoupon = await Coupon.findOne({ _id: req.body.code }).exec();
    if (!duplicateCoupon) {
      return res.status(409).json({ "message": `The specified coupon ${duplicateCoupon} already exists` });
    };

    const coupon = await new Coupon({
      code: req.body.code,
      discount_type: req.body.discount_type,
      discount_value: req.body.discount_value,
      currency: req.body.currency
    });

    coupon.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(201).json(coupon);
    });
  }
];


const updateCoupon = [
  body('code')
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage('Sub-category must be at least 3 and less than 20 caharcters long')
      .escape(),
  body('discount_type')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Discount type must be specified')
      .escape(),
  body('discount_value')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Discount value must be specified')
      .escape(),
  body('currency')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Currency must be specified')
      .escape()
  ,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };
    const coupon = await Coupon.findOne({ _id: req.params.id }).exec();
    if (!coupon) {
      return res.status(404).json({ "message": `The specified coupon ${req.body.coupon} does not match our records` });
    };
    if (req.body?.code) coupon.code = req.body.code;
    if (req.body?.discount_type) coupon.discount_type = req.body.discount_type;
    if (req.body?.discount_value) coupon.discount_type = req.body.discount_value;
    if (req.body?.currency) coupon.currency = req.body.currency;

    const result = await coupon.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    });
  }
];


const deleteCoupon = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "Accurate coiupon required" });

  const coupon = await Coupon.findOne({ _id: red.params.id }).exec();
  if (!coupon) {
    return res.status(404).json({ "message": `No coupon matches ${req.params.id}` });
  }
  const result = await Coupon.deleteOne();
  res.json(result);
};



module.exports = {
  getAllCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon
};
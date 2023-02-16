const Payment = require('../models/Payment');
const { body, validationResult } = require('express-validator');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');



const getAllPayments = async (req, res) => {
  const payments = await Payment.find().sort('-created_at');
  if ((!payments) || (payments.length < 1)) return res.status(404).json({ "message": "No payments found" });
  res.json(payments);
};


const getPayment = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "Accurate payment ID required" });

  const payment = await Payment.findOne({ _id: req.params.id }).exec();
  if (!payment) {
    return res.status(404).json({ "message": `No payment matches the payment ID ${req.params.id}` });
  }
  res.json(payment);
};


const createPayment = [
  body('payment_method')
      .trim()
      .isLength({ min: 1})
      .withMessage('A valid payment method must be provided')
      .escape(),
  body('status')
      .trim()
      .isLength({ min: 1})
      .withMessage('Stat')
      .escape(),
  async (req, res) => {

  }
];


const updatePayment = async (req, res) => {

};


const deletePayment = async (req, res) => {

};



module.exports = {
 getAllPayments,
 getPayment,
 createPayment,
 updatePayment,
 deletePayment
};
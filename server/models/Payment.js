const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
 reference: { String, unique: true, required: true },
 payment_method: {
  String,
  enum: ['Bitcoin', 'Debit/Credit Card', 'Cash on Delivery', 'PayPal', 'Wire Transfer'],
  default: 'Debit/Credit Card',
  required: true
 },
 status: {
  String,
  enum: ['Success', 'Pending', 'Failed'],
  default: 'Failed',
  required: true
 },
 user: { type: Schema.Types.ObjectId, ref: 'User' },
 order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
 date: { Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);
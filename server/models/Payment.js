const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    ref: { type: String, unique: true, required: true },
    payment_method: {
      type: String,
      enum: ['Bitcoin', 'Debit/Credit Card', 'Cash on Delivery', 'PayPal', 'Wire Transfer'],
      default: 'Debit/Credit Card',
      required: true
    },
    status: {
      type: String,
      enum: ['Success', 'Pending', 'Failed'],
      default: 'Failed',
      required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    date: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
  });

module.exports = mongoose.model('Payment', PaymentSchema);
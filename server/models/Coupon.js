const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
    code: { type: String, min: 3, max: 20, unique: true, required: true },
    discount_type: { type: String, required: true },
    discount_value: { type: Number, required: true },
    currency: { type: Schema.Types.ObjectId, ref: 'Currency' }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Coupon', CouponSchema);
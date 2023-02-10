const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
 code: { type: String, minLength: 3, maxLength: 20, unique: true, required: true },
 discount_value: { type: Number, required: true },
 currency: { type: Schema.Types.ObjectId, ref: 'Currency' },
 discount_type: { type: String, required: true }
});

module.exports = mongoose.model('Coupon', CouponSchema);
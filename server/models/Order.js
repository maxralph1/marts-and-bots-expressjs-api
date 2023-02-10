const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
 order_items: [
  { product_choice: { type: Schema.Types.ObjectId, ref: 'ProductInstance', required: true } }
 ],
 shipping_address: {
  full_name: { String, minLength: 3, maxLength: 50 },
  address: { String, minLength: 3, maxLength: 150 },
  city:  { String, minLength: 3, maxLength: 150 },
  postal_code: { String, minLength: 3, maxLength: 15 },
  country: { String, minLength: 3, maxLength: 45 },
  location: {
   latitude: { String, minLength: 3, maxLength: 15 },
   longitude: { String, minLength: 3, maxLength: 15 },
   plus_code: { String, minLength: 3, maxLength: 15 },
  },
 },
 items_price: { Number, required: true },
 shipping_cost: { Number, required: true },
 vat: { Number, required: true },
 total_price: { Number, required: true },
 payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
 user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
 coupon: { type: Schema.Types.ObjectId, ref: 'Coupon', required: true },
 is_delivered: Boolean,
 return_order: Boolean
});

module.exports = mongoose.model('Order', OrderSchema);
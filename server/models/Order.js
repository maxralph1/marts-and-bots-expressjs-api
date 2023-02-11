const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  order_items: [
    { product_choice: { type: Schema.Types.ObjectId, ref: 'ProductInstance', required: true } }
    ],
    shipping_address: {
      full_name: { type: String, min: 3, max: 50 },
      address: { type: String, min: 3, max: 150 },
      city:  { type: String, min: 3, max: 150 },
      postal_code: { type: String, min: 3, max: 15 },
      country: { type: String, min: 3, max: 45 },
      location: {
      latitude: { type: String, min: 3, max: 15 },
      longitude: { type: String, min: 3, max: 15 },
      plus_code: { type: String, min: 3, max: 15 },
      },
    },
    items_price: { type: Number, required: true },
    shipping_cost: { type: Number, required: true },
    vat: { type: Number, required: true },
    total_price: { type: Number, required: true },
    payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    coupon: { type: Schema.Types.ObjectId, ref: 'Coupon', required: true },
    is_delivered: Boolean,
    return_order: Boolean
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', OrderSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    ref: String,
    order_items: [
      { product_choice: { type: Schema.Types.ObjectId, ref: 'ProductInstance', required: true } }
    ],
    shipping_address: {
      full_name: { type: String, minLength: 3, maxLength: 100 },
      address: { type: String, minLength: 3, maxLength: 150 },
      phone: { type: String, minLength: 3, maxLength: 30 },
      email: { type: String, minLength: 3, maxLength: 150 },
      city:  { type: String, minLength: 3, maxLength: 150 },
      postal_code: { type: String, minLength: 3, maxLength: 15 },
      country: { type: String, minLength: 3, maxLength: 45 },
      location: {
        latitude: { type: String, minLength: 3, maxLength: 15 },
        longitude: { type: String, minLength: 3, maxLength: 15 },
        plus_code: { type: String, minLength: 3, maxLength: 15 },
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
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  },
  {
    optimisticConcurrency: true
  }
);

module.exports = mongoose.model('Order', OrderSchema);
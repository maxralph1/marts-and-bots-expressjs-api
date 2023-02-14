const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductInstanceSchema = new Schema({
    name: { type: String, minLength: 2 },
    slug: String,
    imprint: String,
    color: String,
    isbn: String,
    other_details: [String],
    status: {
      type: String,
      enum: ['Available', 'Sold', 'Returned'],
      default: 'Available',
      required: true
    },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  },
  {
    optimisticConcurrency: true
  }
);

module.exports = mongoose.model('ProductInstance', ProductInstanceSchema);
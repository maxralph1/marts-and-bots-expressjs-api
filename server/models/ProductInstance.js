const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductInstanceSchema = new Schema({
 name: { String, minLength: 2 },
 code: String,
 imprint: String,
 color: String,
 ISBN: String,
 status: {
  String,
  enum: ['Available', 'Sold'],
  default: 'Available',
  required: true
 },
 product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
 user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('ProductInstance', ProductInstanceSchema);
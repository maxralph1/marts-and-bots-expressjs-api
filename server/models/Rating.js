const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
 product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
 user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
 stars: {
  Number,
  enum: [1, 2, 3, 4, 5],
  default: 3,
  required: true
 },
});

module.exports = mongoose.model('Rating', RatingSchema);
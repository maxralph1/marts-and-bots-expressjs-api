const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
 name: { String, maxLength: 45, required: true },
 details: String,
 size: Number,
 size_unit: String,
 code: { String, unique: true, required: true },
 slug: { String, maxLength: 150 },
 image: String,
 images: [ String ],
 web_link: String,
 video_link: String,
 brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
 category: { type: Schema.Types.ObjectId, ref: 'Category' },
 sub_category: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
 colors: [ String ],
 purchase_price: Number,
 purchase_currency: { type: Schema.Types.ObjectId, ref: 'Currency' },
 selling_price: Number,
 selling_currency: { type: Schema.Types.ObjectId, ref: 'Currency' },
 discount: Number,
 status: {
  String,
  enum: ['Available', 'Sold'],
  default: 'Available',
  required: true
 },
})
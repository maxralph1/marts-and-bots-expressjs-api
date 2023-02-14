const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, maxLength: 100, required: true },
    details: String,
    size: Number,
    size_unit: String,
    code: { type: String, unique: true, required: true },
    slug: { type: String, maxLength: 150 },
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
    discount_unit: Number,
    discount_type: String,
    status: {
      type: String,
      enum: ['Available', 'Sold'],
      default: 'Available',
      required: true
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Product', ProductSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: { type: String, min: 2, max: 45, required: true },
    code: { type: String, min: 2, max: 45, unique: true, required: true },
    logo: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Brand', BrandSchema);
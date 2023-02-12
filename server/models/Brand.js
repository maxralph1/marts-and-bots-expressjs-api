const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: { type: String, required: true },
    code: { type: String, unique: true, required: true },
    logo: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Brand', BrandSchema);
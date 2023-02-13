const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: { type: String, minLength: 2, maxLength: 45, required: true },
    code: { type: String, unique: true, required: true },
    logo: String
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);



module.exports = mongoose.model('Brand', BrandSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, minLength: 2, maxLength: 45, unique: true, required: true },
    slug: { type: String, minLength: 2, maxLength: 45, unique: true, required: true },
    description: { type: String }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Category', CategorySchema);
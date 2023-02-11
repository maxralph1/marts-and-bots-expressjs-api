const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, min: 2, max: 45, unique: true, required: true }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Category', CategorySchema);
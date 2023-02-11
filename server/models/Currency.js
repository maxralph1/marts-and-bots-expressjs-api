const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurrencySchema = new Schema({
    code: { type: String, min: 3, max: 3, unique: true, required: true },
    sign: { type: String, max: 1 },
    html_sign: { type: String, max: 10 },
    name: { type: String, min: 3, max: 3, unique: true, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Currency', CurrencySchema);
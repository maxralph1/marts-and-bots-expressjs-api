const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurrencySchema = new Schema({
    code: { type: String, minLength: 3, maxLength: 3, unique: true, required: true },
    sign: { type: String, maxLength: 10 },
    html_sign: { type: String, maxLength: 10 },
    name: { type: String, minLength: 3, maxLength: 35, unique: true, required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Currency', CurrencySchema);
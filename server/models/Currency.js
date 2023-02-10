const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurrencySchema = new Schema({
 code: { String, minLength: 3, maxLength: 3, unique: true, required: true },
 sign: { String, maxLength: 1 },
 html_sign: { String, maxLength: 10 },
 name: { String, minLength: 3, maxLength: 3, unique: true, required: true },
});

module.exports = mongoose.model('Currency', CurrencySchema);
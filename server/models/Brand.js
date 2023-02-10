const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
 name: { String, minLength: 2, maxLength: 45, unique: true, required: true },
 logo: String
});

module.exports = mongoose.model('Brand', BrandSchema);
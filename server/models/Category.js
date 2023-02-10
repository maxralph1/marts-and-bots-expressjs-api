const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
 name: { String, minLength: 2, maxLength: 45, unique: true, required: true },
});

module.exports = mongoose.model('Category', CategorySchema);
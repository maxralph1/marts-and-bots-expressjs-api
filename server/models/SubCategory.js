const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
 name: { String, minLength: 2, maxLength: 45, unique: true, required: true },
 category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }
});

module.exports = mongoose.model('SubCategory', SubCategorySchema);
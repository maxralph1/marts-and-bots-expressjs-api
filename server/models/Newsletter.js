const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsletterSchema = new Schema({
 email: { type: String, minLength: 3, maxLength: 100, unique: true, required: true }
})

module.exports = mongoose.model('Newsletter', NewsletterSchema);
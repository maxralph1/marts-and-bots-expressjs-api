const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsletterSchema = new Schema({
    name: { type: String, maxLength: 45, unique: true, required: true },
    email: { type: String, minLength: 3, maxLength: 75, unique: true, required: true }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  })

module.exports = mongoose.model('Newsletter', NewsletterSchema);
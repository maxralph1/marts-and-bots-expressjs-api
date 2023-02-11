const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsletterSchema = new Schema({
    email: { type: String, min: 3, max: 100, unique: true, required: true }
  },
  {
    timestamps: true,
  })

module.exports = mongoose.model('Newsletter', NewsletterSchema);
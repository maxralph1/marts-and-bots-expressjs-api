const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, minLength: 3, maxLength: 45, unique: true, required: true },
    password: { type: String, minLength: 10, required: true },
    first_name: { type: String, maxLength: 45, required: true },
    other_names: { type: String, maxLength: 45 },
    last_name: { type: String, maxLength: 45, required: true },
    company_name: { type: String, maxLength: 150 },
    profile_image: String,
    description: String,
    phone: String,
    email: String,
    email_verified_at: Date,
    roles: [ { type: Schema.Types.ObjectId, ref: 'Role' } ],
    display_mode: Boolean,
    language: [ { type: String, enum: ['de', 'en-US', 'en', 'fr', 'es'], default: 'en-US', required: true } ],
    refresh_token: String,
    is_deleted: Boolean
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('User', UserSchema);
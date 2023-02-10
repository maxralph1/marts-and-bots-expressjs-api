const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
 username: { String, minLength: 3, maxLength: 45, unique: true, required: true },
 first_name: { String, maxLength: 45, required: true },
 other_names: { String, maxLength: 45 },
 last_name: { String, maxLength: 45, required: true },
 company_name: { String, maxLength: 150 },
 profile_image: String,
 description: String,
 phone: String,
 email: String,
 email_verified_at: Date,
 roles: [ { type: Schema.Types.ObjectId, ref: 'Role' } ],
 display_mode: Boolean,
 language: [ { String, enum: ['de', 'en-US', 'en', 'fr', 'es'], default: 'en-US', required: true } ],
 refresh_token: String,
 is_deleted: Boolean
});

module.exports = mongoose.model('User', UserSchema);
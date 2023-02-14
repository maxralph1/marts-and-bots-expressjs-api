const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: { type: String, minLength: 3, maxLength: 45, unique: true, required: true },
    code: { type: String, minLength: 3, maxLength: 45, unique: true, required: true }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Role', RoleSchema);
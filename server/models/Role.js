const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: { type: String, minLength: 3, maxLength: 45, unique: true, required: true },
    code: { type: String, minLength: 3, maxLength: 45, unique: true, required: true }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Role', RoleSchema);
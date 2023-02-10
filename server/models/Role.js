const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
 name: { String, minLength: 3, maxLength: 45, unique: true, required: true },
 code: { String, minLength: 3, maxLength: 45, unique: true, required: true }
});

module.exports = mongoose.model('Role', RoleSchema);
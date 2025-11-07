const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: String,
    email: String,
    role: String,
    verified: Boolean
});

module.exports = model('User', UserSchema, 'users');
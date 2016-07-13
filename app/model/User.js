var mongoose = require('mongoose');
var crypto = require('crypto');

var UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, unique: true},
    password: String,
    salt: String
});

mongoose.model('User', UserSchema);

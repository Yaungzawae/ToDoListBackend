const mongoose = require('../config/db.config');
const passportLocalMongoose = require('passport-local-mongoose')
const userSchema = mongoose.Schema({
    email : String,
    password : String,
    tasks : []
})
userSchema.plugin(passportLocalMongoose, {usernameField : "email"})
const User = mongoose.model("user", userSchema);

module.exports = User;
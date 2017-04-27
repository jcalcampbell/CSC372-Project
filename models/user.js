// load items
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define schema
var userSchema = mongoose.Schema({

    local: {
        email: String,
        password: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }

});

// methods
// generate hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// compare hash
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// export
module.exports = mongoose.model('User', userSchema);
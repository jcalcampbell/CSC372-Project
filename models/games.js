var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({

    title: String,
    description: String,
    externalUrl: String,
    dataName: String,
    height: Number,
    width: Number

});

module.exports = mongoose.model('Games', gameSchema);
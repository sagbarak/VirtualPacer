const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userScheme = new Schema ({
    age: {type: Number}, 
    gender: {type: String},
    result: [{ game: String,time: Number, level: Number, mistakes: Number,moves: Number }]
  });
module.exports = mongoose.model('userScheme',userScheme);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userScheme = new Schema ({
    firstname: {type: String}, 
    lastname: {type: String},
    age: {type: Number },
    result: [{ game: String,time: Number, level: Number, mistakes: Number,moves: Number,quality:Number }]
  });
module.exports = mongoose.model('userScheme',userScheme);

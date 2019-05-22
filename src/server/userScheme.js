const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userScheme = new Schema ({
    age: {type: Number}, 
    gender: {type: String},
    result: [{ game: String , pacerver: Number ,time: Number, level: Number, mistakes: Number,moves: Number }]
  });
module.exports = mongoose.model('userScheme',userScheme);

/*pacer version:
 0 - no pacer
 1 - near the user pacer
 2 - faster pacer
 */

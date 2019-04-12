const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userScheme = new Schema ({
    firstname: {type: String}, 
    lastname: {type: String},
    result: [{ time: Number, level: Number }]
  });
module.exports = mongoose.model('userScheme',userScheme);

const mongoose = require('mongoose');

const userScheme = new mongoose.Schema ({
    Id: {type: Number},
    FirstName: {type: String}, 
    LastName: {type: String},
    result: [{ time: Number, level: Number }]
  });


module.exports = mongoose.model('userScheme',userScheme);

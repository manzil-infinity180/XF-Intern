const mongoose = require("mongoose");
const validator = require("validator");
const appliedSchema = new mongoose.Schema({
    id: {
        type: String,
        unique:[true,"You already applied"]
     },
     companyname:{
        type:String,
     },
     website : {
        type:String,
     },
     roleName : {
        type:String,
     },
     logo:{
        type:String,
     },
     salary:{
      type:Number,
     },
     experience:{
      type:String
     }

});


 const Applied = mongoose.model('Applied',appliedSchema);
 module.exports = Applied;
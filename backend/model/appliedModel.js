const mongoose = require("mongoose");
const validator = require("validator");
const appliedSchema = new mongoose.Schema({
    id: {
        type: String,
     },
     type:{
      type:String,
      enum:['internship-onsite','job-onsite','internship-remote','job-remote'],
     },
     companyId:{
        type:String,
     },
     roleName : {
        type:String,
     },
     salary:{
      type:Number,
     },
     duration:{
      type:Number
     },
     website : {
      type:String,
   },
   start:{
    type:Date,
   },
   status:{
      type:String,
      default:"pending",
      enum:["pending","inprogress","notselected","selected"]
   },
   userId:{
      type:mongoose.Schema.Types.ObjectId,
   }



});


 const Applied = mongoose.model('Applied',appliedSchema);
 module.exports = Applied;
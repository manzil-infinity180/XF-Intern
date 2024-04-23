const mongoose = require("mongoose");
const validator = require("validator");
const appliedSchema = new mongoose.Schema({
      pid: {
        type: String,
     },
     type:{
      type:String,
      enum:['internship-onsite','job-onsite','internship-remote','job-remote'],
     },
     companyId:{
        type:String,
     },
     name : {
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
   deadline:{
      type:Date
   },
   companyName:{
      type:String
   },
   description:{
      type:String
   },
   status:{
      type:String,
      default:"pending",
      enum:["pending","inprogress","notselected","selected"]
   },
   userId:{
      type:mongoose.Schema.Types.ObjectId,
   },
   logo:{
      type:String,
      default:'https://internshala.com/static/images/company/logo.svg'
   },
   createdAt:{
      type:String,
      default : Date.now()
    },
});

appliedSchema.index({createdAt:1});
 const Applied = mongoose.model('Applied',appliedSchema);
 module.exports = Applied;
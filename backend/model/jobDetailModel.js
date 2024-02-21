const mongoose = require("mongoose");
const validator = require("validator");
const jobSchema = new mongoose.Schema({
     type: {
        type: String,
        enum:['internship','job','Internship','Job'],
        default:'internship'
     },
     company_name:{
        type:String,
     },
     website : {
        type:String,
     },
     role : {
        type:String,
     },
     start:{
        type:Number,
     },
     end:{
      type:Number,
     },
     cover_letter:{
      type:String
     },
     applied:{
      type:Boolean,
      default:false
     }

});


 const Experience = mongoose.model('Experience',jobSchema);
 module.exports = Experience;
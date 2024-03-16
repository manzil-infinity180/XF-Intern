const mongoose = require("mongoose");
const validator = require("validator");
const adminPostSchema = new mongoose.Schema({
     type: {
        type: String,
        enum:['internship-onsite','job-onsite','internship-remote','job-remote'],
        required:[true,"Mention the type of role"]
     },
     name : {
        type:String,
        required:[true,"Mention the role name like Mern,full stack,android development ..."]
     },
     adminId:{
        type:String
     },
     website : {
        type:String,
     },
     start:{
      type:Date,
     },
     salary:{
        type:Number,
        required:[true,"Mention the salary/stipend per month"]
     },
     duration:{
        type:Number,
        required:[true,"Total duration of job/internship"]
     }

});


 const Adminpost = mongoose.model('Adminpost',adminPostSchema);
 module.exports = Adminpost;
const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
      email: {
        type:String,
        required:[true,'User cannot without emailId'],
        unique:[true,'User Already exist with this email'],
        lowercase:true,
        validate : [validator.isEmail,'Please Provide Valid Email'],
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
      },
     name: {
      type: String,
      required:[true,"It is required field"]
     },
      mobile: {
         type: Number,
         required:[true,"It is required field"]
      },
      college_name: {
         type: String,
         required:[true,"It is required field"]
      },
      year: {
         type: Number,
         required:[true,"It is required field"]
      },
      degree:{
         type:String,
         required:[true,"It is required field"]
      },
      linkedin:{
         type:String
      },
      github:{
         type:String,
      },
      profile :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
     },
      experience:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Experience"
     },],
      pic:{
      type:String,
      default:"https://res.cloudinary.com/dk9gvtcgx/image/upload/v1713268261/xfintern/skn3hfpq78ghwnhp4vyc.png"
     },
      coins:{
      type:Number,
      default:500
     },
     applied:[{
      type:mongoose.Schema.Types.ObjectId,
        ref:"Applied"
     },],
     role:{
      type:String,
      default:"user"
     },
     bookmark:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Adminpost",
      unique: true
     }],
     resume:{
      type:String,
     }
});

 userSchema.index({ 'bookmark': 1 }, { unique: true });
 const User = mongoose.model('User',userSchema);
 module.exports = User;
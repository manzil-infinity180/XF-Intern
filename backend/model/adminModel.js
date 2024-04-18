const mongoose = require("mongoose");
const validator = require("validator");
const adminSchema = new mongoose.Schema({
     email: {
        type:String,
        required:[true,'User cannot without emailId'],
        unique:[true,'User Already exist with this email'],
        lowercase:true,
        validate : [validator.isEmail,'Please Provide Valid Email'],
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
     },
     name:{
      type:String,
      required:[true,"Company name is required field"]
     },
     year:{
      type:Number,
      required:[true,"Your company year of establishment "]
     },
     employee:{
      type:Number,
      default:1
     },
     field:{
      type:String,
      required:[true,"Enter your field/industry of company"]
     },
     summary:{
      type:String,
     },
     website:{
      type:String,
     },
     linkedin:{
      type:String,
      required:[true,"Linkedin account is must to create account"]
     },
     image:{
      type:String,
      default:"https://res.cloudinary.com/dk9gvtcgx/image/upload/v1713268261/xfintern/skn3hfpq78ghwnhp4vyc.png"
     },
     hiring:{
      type:String,
     },
     coins:{
      type:Number,
      default:350
     },
     uuid:{
      type:String
     },
     post : [{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Adminpost"
   },],
   role:{
      type:String,
      default:"admin"
   }
});


 const Admin = mongoose.model('Admin',adminSchema);
 module.exports = Admin;
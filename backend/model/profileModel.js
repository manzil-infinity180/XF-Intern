const mongoose = require("mongoose");
const validator = require("validator");
const profileSchema = new mongoose.Schema({
     name: {
        type: String,
     },
     mobile: {
        type: Number,
     },
   //   pic: {
   //      type: String,
   //   },
     linkedin: {
        type: String,
     },
     github: {
        type: String,
     },
   //   resume: {
   //      type: String,
   //   },
     type: {
        type: String,
        enum:['school','college','College','School'],
        default:"college"
     },
     college_name: {
        type: String,
     },
     start: {
        type: Number,
     },
     end: {
        type: Number,
     },
     project: {
        type: String,
     },
     project_description: {
        type: String,
     },
     member: {
        type: Number,
        default:1
     },
     project_link : {
        type: String,
     },
     resume:{
      type:String,
     },
});


const Profile = mongoose.model('Profile',profileSchema);
module.exports = Profile;
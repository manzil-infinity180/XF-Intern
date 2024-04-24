const mongoose = require("mongoose");
const validator = require("validator");
const subscriberSchema = new mongoose.Schema({
      email: {
        type:String,
        required:[true,'Specify your email id first'],
        unique:[true,'You are already subscribed!'],
        lowercase:true,
        validate : [validator.isEmail,'Please Provide Valid Email'],
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
      }
});

const SubscribeUs = mongoose.model('SubscribeUs',subscriberSchema);
module.exports = SubscribeUs;

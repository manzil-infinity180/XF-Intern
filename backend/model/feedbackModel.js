const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
      title:{
        type:String,
        required:[true,"Atleast specify our name if not title"]
      },
      feedback:{
        type:String,
        required:[true,'All your feedbacks are important to us!']
      }
});

const Feedback = mongoose.model('Feedback',feedbackSchema);
module.exports = Feedback;
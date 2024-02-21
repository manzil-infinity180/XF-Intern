const Experience = require("../model/jobDetailModel");
const User = require("../model/userModel");

exports.createExp = async(req,res,next)=>{
    try{
        const exp = await Experience.create(req.body);

        const user = await User.findById(req.user);
        user.experience.unshift(exp._id);
        await user.save();


        res.status(200).json({
          status:"Success",
          data:{
            exp
          }
        });
    
      }catch(err){
        res.status(200).json({
          status:"Failed",
          message: err.message
        });
      }
}

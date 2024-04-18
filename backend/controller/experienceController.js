const Experience = require("../model/jobDetailModel");
const User = require("../model/userModel");

exports.createExp = async(req,res,next)=>{
    try{
        const exp = await Experience.create(req.body);

        const user = await User.findById(req.user);
       let calcCoins = user.coins + 75; // for every experience it will add 75 coins 
        await User.findByIdAndUpdate(req.user,{coins:calcCoins});
        user.experience.unshift(exp._id);
        await user.save();


        res.status(200).json({
          status:"Success",
          exp
        });
    
      }catch(err){
        res.status(404).json({
          status:"Failed",
          message: err.message
        });
      }
}

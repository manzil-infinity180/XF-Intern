const Applied = require('../model/appliedModel');
const User = require("../model/userModel");
exports.apoliedStatus = async(req,res,next)=>{
    try{
        const id_data = req.body._id;
        const getPre = await Applied.findOne({id:id_data});
        if(getPre){
          throw new Error("Already applied to job/intern");
        }
        const exp = await Applied.create({...req.body,id:id_data});


        const user = await User.findById(req.user);
        user.applied.unshift(exp._id);
        await user.save();


        res.status(200).json({
          status:"Success",
          data:{
            exp
          }
        });
    
      }catch(err){
        res.status(404).json({
          status:"Failed",
          message: err.message
        });
      }
}
exports.getAllApplied = async(req,res,next)=>{
    try{
        const exp = await Applied.find();
        if(!exp){
            throw new Error("No applied Company yet");
        }

        res.status(200).json({
          status:"Success",
          data:{
            exp
          }
        });
    
      }catch(err){
        res.status(404).json({
          status:"Failed",
          message: err.message
        });
    }
}

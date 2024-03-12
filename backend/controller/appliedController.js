const Applied = require('../model/appliedModel');
const User = require("../model/userModel");
const sendEmail = require('../utils/mailing');
exports.apoliedStatus = async(req,res,next)=>{
    try{
        const id_data = req.body._id;
        const {companyname,roleName,salary,experience} = req.body;
        const getPre = await Applied.findOne({id:id_data});
        if(getPre){
          throw new Error("Already applied to job/intern");
        }
        const exp = await Applied.create({...req.body,id:id_data});

        const user = await User.findById(req.user);
        const charge =  companyname.length + roleName.length + (salary+"").length + 
        (experience+"").length ;

        if(charge > user.coins){
          throw new Error("You do not have enough coins to apply");
        }
        const newCoin = user.coins - charge;

        const updateDetail = await User.findByIdAndUpdate(req.user,{coins:newCoin});
         
        user.applied.unshift(exp._id);
        await user.save();

        await sendEmail({
          email: req.user.email,
          subject : `Application to ${companyname} successfully submitted`,
          message : `Your application has been submitted! \n
          If there's a match, we will make an email introduction. \n
          Company: ${companyname} | Role: ${roleName} | ${salary} \n
          Browser more - https://frontend-anchors.onrender.com `,
         });


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

const Profile = require("../model/profileModel");
const jwt = require('jsonwebtoken');
const multer = require("multer");
const sendEmail = require("./../utils/mailing.js");
const sendCookiesAndToken = require("../utils/sendTokenCookies.js");
const cloudinary = require("cloudinary").v2;
const  User = require('../model/userModel.js');

exports.register = async(req,res,next)=>{
    try{

       const dup = await User.findOne({email : req.body.email});
       if(dup){
        throw new Error("Already user existed,Please Login");
       }
        const user = await User.create(req.body);
        console.log(user);
        await sendEmail({
            email: req.body.email,
            subject : 'Xf Registration Successfully Done 🦾',
            message : 'Thank You for Xf registration,you can explore the Xf',
           })
        await sendCookiesAndToken(user,res);

        res.status(200).json({
            status:"Successfully Logined In",
            data:{
                user
            }
          });

    }catch(err){
        res.status(400).json({
            status:"Failed",
            message:err.message
          })

    }
}
let otp ;
let userData;

exports.login = async(req,res,next)=>{
    try{
        const user = await User.findOne({email:req.body.email}).populate('profile').populate('experience').
        populate('applied').exec();
        otp = (Math.random()*1000) + 10000;
        otp = Math.floor(otp);
        console.log(otp);

        if(!user){
          throw new Error("No user existed with these email id")
        }
        userData = req.body.email;
       console.log(user);
        await sendEmail({
            email: req.body.email,
            subject : 'Xf Registration OTP 🦾',
            message : `Thank You for Xf registration, \n Your OTP for login is ${otp}`,
           });

        // await sendCookiesAndToken(user,res);

        res.status(200).json({
            status:"Successfully Send OTP",
          });

    }catch(err){
        res.status(400).json({
            status:"Failed",
            message:err.message
          })

    }
}
exports.verify = async(req,res,next)=>{
  try{
    let OTP = Number(req.body.otp);
    console.log("doc");
      console.log(OTP);
      console.log(otp)
      console.log(userData);
     if(OTP !== otp){
          throw new Error("Incorrect OTP please check it out")
     }

      const user = await User.findOne({email: userData})
                                .populate("profile")
                                .populate("experience");
      
    
      await sendEmail({
          email: userData,
          subject : 'Xf Registration Successfully Done 🦾',
          message : `Thank You for Xf registration,You are successfully logined in`,
         });

      await sendCookiesAndToken(user,res);

      res.status(200).json({
          status:"Successfully Login in",

          data:{
              user
          }
        });

  }catch(err){
      res.status(400).json({
          status:"Failed",
          message:err.message
        })

  }
}


exports.getUser = async(req,res,next)=>{
    try{
      if(!req.user){
        throw new Error("You are logout now , please login again")
      }
        const user = await User.findById(req.user).populate("profile").populate("experience")
        .populate('applied').exec();
        console.log(user);
        res.status(200).json({
            status:"Success",
            data:{
                user
            }
          });

    }catch(err){
        res.status(400).json({
            status:"Failed",
            message:err.message
          })

    }
}
exports.logout = async(req,res,next)=>{
  try{
    
    if(!req.user) throw new Error("You are already logout BRO!!!");
    res.clearCookie('jwt');
    res.status(200).json({
      status:"Success",
      message : "Logout successfully"
    });

  }catch(err){
    res.status(404).json({
      status:"Failed",
      message: err.message
    });
  }
}
exports.isAuthenticated = async (req,res,next) =>{
    try{
      let token;
      console.log(req.cookies);
      if(req.cookies.jwt){
        token = req.cookies.jwt;
      }
      console.log("token----->")
      console.log(token);
      if(!token){
        throw new Error("OOPs, Firstly you have to logined in !!");
      }
      const decode = jwt.verify(token,process.env.JWT_SECRET);
      console.log(decode);
      const currentloginedUser = await User.findById(decode.id);
      console.log(currentloginedUser);
      req.user = currentloginedUser;
      next();
  
    }catch(err){
      res.status(404).json({
        status:"Failed",
       err: err.message
      })
    }
  }
  
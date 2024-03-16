const Profile = require("../model/profileModel");
const jwt = require('jsonwebtoken');
const multer = require("multer");
const sendEmail = require("./../utils/mailing.js");
const sendCookiesAndToken = require("../utils/sendTokenCookies.js");
const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require('uuid');
const Admin = require('../model/adminModel.js');
const User = require("../model/userModel.js");

let otp ;
let userData;

exports.register = async(req,res,next)=>{
    try{
       const already = await Admin.findOne({email : req.body.email});
       // user email & admin email should be different 
       const userExist = await User.findOne({email:req.body.email});
       if(already){
        throw new Error("Already user existed,Please Login");
       }else if(userExist){
        throw new Error("User & Admin should have different email address!");
       }
        const adminData = req.body;
        adminData.hiring = new Date().getFullYear();
        const x = uuidv4();
        adminData.uuid = x;
        const admin = await Admin.create(adminData);
        console.log(admin);
        await sendEmail({
            email: req.body.email,
            subject : 'Xf Registration Successfully Done 🦾 [ADMIN]',
            message : 'Thank You for Xf registration,you can explore the Xf. We are welcoming you all post your job and internship and hired the person who is fit with your team',
           });
        await sendCookiesAndToken(admin ,res,'admin');

        res.status(200).json({
            status:"Successfully Created [ADMIN]",
            data:{
                admin
            }
          });

    }catch(err){
      console.log(err);
        res.status(400).json({
            status:"Failed",
            message:err.message
          })

    }
}

exports.login = async(req,res,next)=>{
    try{
        const user = await Admin.findOne({email:req.body.email});

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

      const user = await Admin.findOne({email: userData});
    
      await sendEmail({
          email: userData,
          subject : 'Xf Registration Login [ADMIN] 🦾',
          message : `Thank You for Xf registration,You are successfully logined in`,
         });

      await sendCookiesAndToken(user,res,'admin');

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

exports.getAdminDetail = async(req,res,next)=>{
    try{
      if(!req.admin){
        throw new Error("You are logout now , please login again")
      }
        const user = await Admin.findById(req.admin);

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
    
    if(!req.admin) throw new Error("You are already logout BRO!!!");
    res.clearCookie('admin');
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
exports.updateDetails = async  (req,res,next) =>{
    try{
        
        const {email,image,coins,post} = req.body;
        if(email || image || coins || post ){
            throw new Error(
                "you can not change the image,email,coins,post fields"
            )
        }
        
        const updatedUser = await Admin.findByIdAndUpdate(req.admin,req.body);

        res.status(200).json({
            status:"Success",
            message : "Updated Details successfully"
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
    if(req.cookies.admin){
      token = req.cookies.admin;
    }
    console.log("token----->")
    console.log(token);
    if(!token){
      throw new Error("OOPs, Firstly you have to logined in !!");
    }
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    console.log(decode);
    const currentloginedUser = await Admin.findById(decode.id);
    console.log(currentloginedUser);
    req.admin = currentloginedUser;

    next();

  }catch(err){
    res.status(404).json({
      status:"Failed",
     err: err.message
    })
  }
}
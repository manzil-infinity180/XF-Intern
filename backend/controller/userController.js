const Profile = require("../model/profileModel");
const jwt = require('jsonwebtoken');
const multer = require("multer");
const sendEmail = require("./../utils/mailing.js");
const sendCookiesAndToken = require("../utils/sendTokenCookies.js");
const cloudinary = require("cloudinary").v2;
const User = require('../model/userModel.js');
const Admin = require('../model/adminModel.js');
const redisClient = require("../utils/redisConnect.js");
let otp ;
let userData;
exports.register = async(req,res,next)=>{
    try{
        const {email,role} = req.body;
       const already = await User.findOne({email : email});
       const adminExist = await Admin.findOne({email : email});

       if(already){
        throw new Error("Already user existed,Please Login");
       }else if(adminExist){
        throw new Error("User and Admin email should be different !");
       }else if(!req.body.role && req.body.role!=='adminn'){
        throw new Error("Role to mention is must and from here you cannot be admin ,select as user");
       }

       

       otp = (Math.random()*1000) + 10000;
        otp = Math.floor(otp);
        console.log(otp);
       userData = req.body;
       await sendEmail({
        email: req.body.email,
        subject : 'Xf Registration OTP 🦾',
        message : `Thank You for Xf registration, \n Your OTP for login is ${otp}`,
       });
        res.status(200).json({
            status:"Successfully OTP Send",
          });

    }catch(err){
        res.status(400).json({
            status:"Failed",
            message:err.message
          })

    }
}


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
     let user
     if(userData.role){
       user = await User.create(userData);
        console.log(user);
        await redisClient.set(req.path, 120, JSON.stringify({user: user}));


     }else{
      user = await User.findOne({email: userData})
                                .populate("profile")
                                .populate("experience")
     }
       
      
    
      await sendEmail({
          email: userData.email,
          subject : 'Xf Registration Successfully Done 🦾',
          message : `Thank You for Xf registration,You are successfully logined in`,
         });

      await sendCookiesAndToken(user,res,'user');

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

      try{
       const key = req.originalUrl || req.url;
        await redisClient.set(key,JSON.stringify({data : user}),'ex',5*60*60);
      }catch(err){
        console.error("RedisError : "+err);
      }

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
  
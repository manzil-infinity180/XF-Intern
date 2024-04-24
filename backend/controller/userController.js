const Profile = require("../model/profileModel");
const jwt = require('jsonwebtoken');
const multer = require("multer");
const sendEmail = require("./../utils/mailing.js");
const sendCookiesAndToken = require("../utils/sendTokenCookies.js");
const cloudinary = require("cloudinary").v2;
const User = require('../model/userModel.js');
const Admin = require('../model/adminModel.js');
const redisClient = require("../utils/redisConnect.js");
const { ObjectId } = require("mongodb");
const Feedback = require("../model/feedbackModel.js");
const SubscribeUs = require("../model/subscriberModel.js");
const storage = multer.memoryStorage();
const upload = multer({storage});
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
       }

       

       otp = (Math.random()*1000) + 10000;
        otp = Math.floor(otp);
       userData = req.body;
       userData.role = "user";

       await sendEmail({
        email: req.body.email,
        subject : 'Xf Intern OTP 🦾',
        message : `Thank You for using Xf Intern, \n Your OTP for login is <span style="font-size:1.15rem;"> ${otp}</span>`,
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

       
        const user = await User.findOne({email:req.body.email},{role:0}).populate('profile').populate('experience').
        populate('applied').exec();
        otp = (Math.random()*1000) + 10000;
        otp = Math.floor(otp);

        if(!user){
          throw new Error("No user existed with these email id")
        }
        userData = user;
        await sendEmail({
            email: req.body.email,
            subject : `Xf Itern Registration OTP 🦾 - ${user.name}`,
            message : `Thank You for using Xf Itern, Your OTP for login is  <span style="font-size:1.15rem;"> ${otp} </span>`,
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

    if(req.admin){
      res.clearCookie('admin');
    }

    let OTP = Number(req.body.otp);
     if(OTP !== otp){
          throw new Error("Incorrect OTP please check it out")
     }
     let user
     if(userData.role){
       user = await User.create(userData);
     }else{
      user = await User.findOne({email: userData.email})
                                .populate("profile")
                                .populate("experience")
     }
       
      await sendEmail({
          email: userData.email,
          subject : 'Xf Intern Successfully Done 🦾',
          message : `Thank You for Xf registration,You are successfully logined in`,
         });

      await sendCookiesAndToken(user,res,'user');

      res.status(200).json({
          status:"Successfully Login in",
              user
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
exports.getUserById = async(req,res,next)=>{
  try{
      const id = req.params.id;
      const user = await User.findById(id);
      
      res.status(200).json({
          status:"Success",
          user
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
exports.addbookmark = async(req,res,next)=>{
  try{
    
    if(!req.user) throw new Error("Login first!!");
    const {bookmark_id} = req.body;

    const user = await User.findById(req.user);
    const length = user.bookmark.length;
    for(let i=0;i<length;i++){
       if((user.bookmark[i]+'').includes(bookmark_id)){
        throw new Error("Already bookmark 🥱")
       }
    }
    user.bookmark.unshift(bookmark_id);
    user.save();
    res.status(200).json({
      status:"Success",
      message : "Bookmark successfully"
    });

  }catch(err){
    res.status(404).json({
      status:"Failed",
      message: err.message
    });
  }
}
exports.expandBookmark = async (req,res,next) => {
  try{
     const bookmark = await User.findById(req.user).populate("bookmark");
     res.status(200).json({
      bookmark
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
      if(req.cookies.jwt){
        token = req.cookies.jwt;
      }
      if(!token){
        throw new Error("OOPs, Firstly you have to logined in !!");
      }
      const decode = jwt.verify(token,process.env.JWT_SECRET);
      const currentloginedUser = await User.findById(decode.id);
      req.user = currentloginedUser;
      next();
  
    }catch(err){
      res.status(404).json({
        status:"Failed",
       err: err.message
      })
    }
  }
  exports.imageUpload = upload.single('pic');
  
  exports.updateUser = async(req,res,next)=>{
    try{
  
      const updatedData = {};
      const user = await User.findById(req.user);
  
      let url;
      if(req.file && req.file.fieldname === 'pic'){
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      let result = await cloudinary.uploader.upload(dataURI,{
        folder:"job-logo"
      });
      updatedData.pic = result.url;
      } 
      
      
  
        const detail = await User.findByIdAndUpdate(req.user,updatedData,{
        run:true,
        runValidators:true
        })
          res.status(200).json({
              status:"Success",
              detail
          });
      }catch(err){
          res.status(404).json({
              status:"Failed",
              data:{
                err:err.message
              }
            })
      }
  }
exports.giveFeedback = async (req,res,next) => {
    try{
       const bookmark = await Feedback.create(req.body);
       res.status(200).json({
        bookmark
      });
    }catch(err){
      res.status(404).json({
        status:"Failed",
        message: err.message
      });
    }
}
exports.subscribeMe = async (req,res,next) => {
  try{
     const subscribed  = await SubscribeUs.findOne({email:req.body.email});

     if(subscribed){
      throw new Error("You already subscribed!")
     }
     const subscribe = await SubscribeUs.create(req.body);
     await sendEmail({
      email: req.body.email,
      subject : 'Xf Intern Subscribed 🦾',
      message : `Thank You for <b>Subscribing Us</b>. In some recent time we will notified you when our website is full active ❤️.`,
     });
     res.status(200).json({
      subscribe
    });
  }catch(err){
    res.status(404).json({
      status:"Failed",
      message: err.message
    });
  }
}

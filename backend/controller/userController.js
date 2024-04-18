const Profile = require("../model/profileModel");
const jwt = require('jsonwebtoken');
const multer = require("multer");
const sendEmail = require("./../utils/mailing.js");
const sendCookiesAndToken = require("../utils/sendTokenCookies.js");
const cloudinary = require("cloudinary").v2;
const User = require('../model/userModel.js');
const Admin = require('../model/adminModel.js');
const redisClient = require("../utils/redisConnect.js");
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
        console.log(otp);
       userData = req.body;
       userData.role = "user";

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

       
        const user = await User.findOne({email:req.body.email},{role:0}).populate('profile').populate('experience').
        populate('applied').exec();
        otp = (Math.random()*1000) + 10000;
        otp = Math.floor(otp);
        console.log(otp);

        if(!user){
          throw new Error("No user existed with these email id")
        }
        userData = user;
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

    if(req.admin){
      res.clearCookie('admin');
    }
    console.log("checking");
    console.log(req.cookies.admin);

    let OTP = Number(req.body.otp);
    console.log("doc");
      console.log(OTP);
      console.log(otp)
      console.log(userData);
      console.log("userdata");
     if(OTP !== otp){
          throw new Error("Incorrect OTP please check it out")
     }
     let user
     if(userData.role){
       user = await User.create(userData);
        console.log(user);
     }else{
      console.log("hello .....")
      user = await User.findOne({email: userData.email})
                                .populate("profile")
                                .populate("experience")
     }
       
      console.log(user);
      await sendEmail({
          email: userData.email,
          subject : 'Xf Registration Successfully Done 🦾',
          message : `Thank You for Xf registration,You are successfully logined in`,
         });

      await sendCookiesAndToken(user,res,'user');

      res.status(200).json({
          status:"Successfully Login in",
              user
        });

  }catch(err){
    console.log(err);
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
exports.getUserById = async(req,res,next)=>{
  try{
      const id = req.params.id;
      const user = await User.findById(id);
      console.log(user);
      
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
    user.bookmark.push(bookmark_id);
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
  exports.imageUpload = upload.single('pic');
  
  exports.updateUser = async(req,res,next)=>{
    try{
  
      const updatedData = {};
      console.log(req.body);
      const user = await User.findById(req.user);
  
      let url;
      console.log(req.file)
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

  
  /*
    const imageSize = 10 * 1024 * 1024;
    if(imageSize < req.file.size){
      throw new Error("Your file must be less than 10 MB")
    }
  if (req.file.fieldname === 'photo') {
  if (!updateData.photo) {
    console.log(req.file);
    
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    // imageURL = req.file.filename;
    // let imagePath = `https://cloudinary-devs.github.io/cld-docs-assets/assets/images/${imageURL}`;
    let result = await cloudinary.uploader.upload(dataURI,{
      folder:"photo"
    });
    
    
    // console.log(result);
  // updateData.image = req.file.filename;
    updateData.image = result.url;
  }
} 
  */
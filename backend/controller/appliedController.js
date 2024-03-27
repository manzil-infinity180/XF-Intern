const Applied = require('../model/appliedModel');
const User = require("../model/userModel");
const Adminpost = require("../model/adminPostModel");
const sendEmail = require('../utils/mailing');
const Admin = require('../model/adminModel');
const client = require("../utils/redisConnect");
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
        // redis part - caching - setting the value 
        const key = req.originalUrl || req.url;
        try{
          await client.set(key,JSON.stringify({data : exp}),'ex',5*60*60);
        }catch(err){
          console.error("Redis Error "+err);
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


// New Way 

// user is applying to a post via id of adminPost (which any  role)
// what we are doing is saving the id of applied to the user Model and 
// id of user who is applying is also saved into that post he is applied

// adminpost ki id
exports.applyToRole = async(req,res,next) =>{
  try{
    // post
      const {_id,type,name,adminId,salary,duration,
      website,start} = req.body;
      const user = await User.findById(req.user);
      if(!user.profile){
        throw new Error("User must have profile to apply anypost");
      }
      const data = await Applied.create({
      id: _id,
      type,
      companyId:adminId,
      roleName: name,
      salary,
      duration,
      website,
      start,
      userId:user._id
    });
    
    // fix the profile field on User Model change it from array to normal one 
    

    user.applied.push(data._id);
    await user.save();

    const adminPost = await Adminpost.findById(_id);
    console.log(adminPost);
    adminPost.userId.push(user._id);
    await adminPost.save();
    // admin -> adminPost -> adminId -> email
    // user -> User -> email 

    // trigger a mail to both user and admin 
    const adminDetail = await Admin.findOne({uuid:adminPost.adminId});

    await sendEmail({
      email: req.user.email,
      subject : `Application to ${adminDetail.name} successfully submitted`,
      message : `Your application has been submitted! \n
      If there's a match, we will make an email introduction. \n
      Company: ${adminDetail.name} | Role: ${name} | ${salary} \n
      Browser more - https://frontend-anchors.onrender.com `,
     });
    
    await sendEmail({
      email : adminDetail.email,
      subject:` New User applied to role :${name} `,
      message:`A new user recently applied to your role see there details 
      Email:${user.email}
      Browser more - https://frontend-anchors.onrender.com`
    });

    res.status(200).json({
      status:"success",
      message:"Yeah bro successfully applied ohhhh..."
    })

      


  }catch(err){
    console.log(err);
    res.status(400).json({
      status:"failed",
      message:err.message
    })

  }
}





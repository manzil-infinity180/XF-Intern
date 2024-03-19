const Admin = require("../model/adminModel");
const Post = require("../model/adminPostModel");
const Applied = require("../model/appliedModel");
const User = require("../model/userModel");
const sendEmail = require('../utils/mailing');
const successResponse = (res,output,responseCode=200)=>{
    res.status(responseCode).json({
        length:output.length,
        status:"success",
        output
        
        
     })
}
const failedResponse = (res,error,responseCode=400)=>{
    console.log(error)
    res.status(responseCode).json({
        status:"failed",
        err:error.message
    })
}
exports.createPost= async (req,res,next)=>{
    try{
      console.log("rahul"+ req.admin);
    const authAdmin = await Admin.findById(req.admin._id);
    console.log("authAdmin"+authAdmin);

    const adminid = authAdmin.uuid;
    const adminData = req.body;
    adminData.adminId = adminid;

    const post = await Post.create(adminData);

     authAdmin.post.unshift(post._id);
     await authAdmin.save();
    
     successResponse(res,post,200);

    }catch(err){
        failedResponse(res,err,400);

    }

}
exports.updatePost = async(req,res,next) =>{
    try{
       if(req.body.adminId){
        throw new Error("No access to change  uuid");
       }
    
      
        const id = req.params.id;
        const authAdmin = await Admin.findById(req.admin);
       console.log("authAdmin : ",authAdmin);
        const postToUpdate = await Post.findById(req.params.id);
        console.log("postToUpdate"+postToUpdate);
        if(postToUpdate.adminId !== authAdmin.uuid){
            throw new Error("No permission to change others post");
        }

        const post = await Post.findByIdAndUpdate(id,req.body,{runValidators: true});
        // await post.save();

        successResponse(res,"Post updated successfully",200);
    }catch(err){
        failedResponse(res,err,400);
    }
}
exports.viewPost = async(req,res,next) =>{
    try{
        // get the post using the _id of post
        const post = await Post.findById(req.params.id);

        successResponse(res,post,200);
    }catch(err){
        failedResponse(res,err,400);
    }
}
exports.viewAllPost = async(req,res,next) =>{
    try{
        const post = await Post.find({});

        successResponse(res,post,200);
    }catch(err){
        failedResponse(res,err,400);
    }
}
exports.deletePost = async(req,res,next) =>{
    try{
        const authAdmin = await Admin.findById(req.admin);
        const postToDelete = await Post.findById(req.params.id);
         console.log("userid "+authAdmin.uuid +"& uuid " +postToDelete.adminId);
        if(postToDelete.adminId !== authAdmin.uuid){
            throw new Error("No permission to change others post");
        }
        // delete the post by _id 
        await Post.findByIdAndDelete(req.params.id);
        
        successResponse(res,"post deleted successuly",200);
    }catch(err){
        failedResponse(res,err,400);
    }
}

// get all post of admin who is logined
exports.getAllPostofAdmin = async(req,res,next) =>{
    try{
        const uuid = req.admin.uuid;
        console.log(uuid);
        const data  = await Post.find({adminId:uuid});
        // getting all the role that admin posted 
        successResponse(res,data,200);
    }catch(err){
        failedResponse(res,err,400);
    }
}
exports.getAllPostofOthers = async(req,res,next) =>{
    try{
        const uuid = req.params.uuid;
        console.log(uuid);
        const data  = await Post.find({adminId:uuid});
        // getting all the role that others admin(only one) posted 
        successResponse(res,data,200);
    }catch(err){
        failedResponse(res,err,400);
    }
} 

// GETTING ALL USER WHO APPLIED TO SPECIFIC ROLE/POST
exports.getAllUserApplied = async(req,res,next) =>{
    try{
        const id = req.params.id;
        const post = await Post.findById(id);
        const authAdmin = await Admin.findById(req.admin._id);

        if(post.adminId !== authAdmin.uuid){
            throw new Error("you can not see the others post details") 
        }
        const data  = await Post.findById(id,{userId:1}).populate("userId");
        // getting all the role that others admin(only one) posted 
        successResponse(res,data,200);
    }catch(err){
        failedResponse(res,err,400);
    }
} 

// ADMIN - CHANGE THE STATUS OF APPLIED POST

// you have the applied id as params
// change - ["pending","inprogress","notselected","selected"]
exports.statusChange = async(req,res,next)=>{
    try{
      const admin = await Admin.findById(req.admin._id);
      console.log(admin)
      const {status} = req.body;
      const appliedDetail = await Applied.findOne({id:req.params.id});
      console.log(appliedDetail)
      if(status === appliedDetail.status ){
        throw new error("Click on other status to change the status of application")
      }else if(admin.uuid !==appliedDetail.companyId){
        throw new Error("You cannot change others status");
      }
      appliedDetail.status = status;
      appliedDetail.save();
    //   const appliedDetail = await Applied.findByIdAndUpdate(req.params.id,{status:status});
     
      const userData = await User.findById(appliedDetail.userId);
      await sendEmail({
        email:userData.email,
        subject:`Recuriter seen your application ${appliedDetail.roleName}`,
        message:`Your application and resume is seen by the recuriter and the status is changed from ${appliedDetail.status} to ${status}`
      })
      res.status(200).json({
        status:"success",
        message:`Status change from ${appliedDetail.status} to ${status}`
      })
    }catch(err){
        console.log(err);
      res.status(400).json({
        status:"Failed",
        message: err.message
      });
    }
  }


  

const Admin = require("../model/adminPostModel");
const Post = require("../model/adminPostModel");
const sendEmail = require('../utils/mailing');
const successResponse = (res,output,responseCode=200)=>{
    res.status(responseCode).json({
        status:"success",
        output
        
     })
}
const failedResponse = (res,error,responseCode=400)=>{
    res.status(responseCode).json({
        status:"failed",
        err:error.message
    })
}
exports.createPost= async (req,res,next)=>{
    try{
      console.log("rahul"+ req.admin);
    const authAdmin = await Admin.findById(req.admin);
    console.log(authAdmin);

    const adminId = authAdmin.uuid;
    const adminData = req.body;
    adminData.adminId = adminId;
    // console.log(userId)

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
        const postToUpdate = await Post.findById(req.params.id);
        console.log("userid "+authAdmin.uuid +"& uuid " +postToDelete.adminId);
        if(postToUpdate.adminId !== authAdmin._id){
            throw new Error("No permission to change others post");
        }

        const post = await Post.findByIdAndUpdate(id,req.body);

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
         console.log("userid "+authAdmin._id +"& uuid " +postToDelete.adminId);
        if(postToDelete.adminId !== authAdmin._id){
            throw new Error("No permission to change others post");
        }
        // delete the post by _id 
        await Post.findByIdAndDelete(req.params.id);
        
        successResponse(res,"post deleted successuly",200);
    }catch(err){
        failedResponse(res,err,400);
    }
}

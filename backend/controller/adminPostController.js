const { query } = require("express");
const Admin = require("../model/adminModel");
const Adminpost = require("../model/adminPostModel");
const Post = require("../model/adminPostModel");
const Applied = require("../model/appliedModel");
const User = require("../model/userModel");
const sendEmail = require('../utils/mailing');
const client = require("../utils/redisConnect");
let path = 'api/post'
const successResponse = (res,output,responseCode=200)=>{
    res.status(responseCode).json({
        status:"success",
        output
        
        
     })
}
const failedResponse = (res,error,responseCode=400)=>{
    // console.log(error)
    res.status(responseCode).json({
        status:"failed",
        err:error.message
    })
}
exports.createPost= async (req,res,next)=>{
    try{
      // console.log("rahul"+ req.admin);
    const authAdmin = await Admin.findById(req.admin._id);
    // console.log("authAdmin"+authAdmin);

    const adminid = authAdmin.uuid;
    const adminData = req.body;
    adminData.adminId = adminid;
    adminData.companyName = authAdmin.name;

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
      //  console.log("authAdmin : ",authAdmin);
        const postToUpdate = await Post.findById(req.params.id);
        // console.log("postToUpdate"+postToUpdate);
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
        const post = await Post.findById(req.params.id).populate('userId');
      //   try{
      //     const key = req.originalUrl || req.url;
       
        console.log("done")

      // }catch(err){
      //   console.error("Redis Error "+err);
      // }

        successResponse(res,post,200);
    }catch(err){
        failedResponse(res,err,400);
    }
}
exports.viewAllPost = async(req,res,next) =>{
    try{
        const post = await Post.find({}).limit(req.query.limit).skip(req.query.skip).sort({
          createdAt:-1
        });
        
        try{
            const key = req.originalUrl || req.url;
            // console.log(key);
          // console.log("done")

        }catch(err){
          console.error("RedisError "+err);
        }
       
       
        successResponse(res,post ,200);
    }catch(err){
        failedResponse(res,err,400);
    }
}
exports.deletePost = async(req,res,next) =>{
    try{
        const authAdmin = await Admin.findById(req.admin);
        const postToDelete = await Post.findById(req.params.id);
        //  console.log("userid "+authAdmin.uuid +"& uuid " +postToDelete.adminId);
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
        // if(req.query === '')
        console.log("helloooooo");
        console.log(req.query.limit);
        const data  = await Post.find({adminId:uuid}).populate('userId').sort({
          createdAt:-1
        }); 
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

        // try{
        //     const key = req.originalUrl || req.url;
        //   await client.set(key,JSON.stringify(data),'ex',5*60*60);
        //   console.log("done");
        // }catch(err){
        //   console.error("Redis Error "+err);
        // }

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
      const {status,pid,userId} = req.body;
      // applied _id (we need to fetch other data)
      const appliedDetail = await Applied.findOne({$and:[{
        pid:pid},{userId:userId}]});
        const currentStatus = appliedDetail.status;
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
        subject:`Recuriter seen your application ${appliedDetail.name}`,
        message:`Your application and resume is seen by the recuriter and the status is changed from ${currentStatus} to ${status}`
      })
      res.status(200).json({
        status:"success",
        message:`Status change from ${currentStatus} to ${status}`
      })
    }catch(err){
        console.log(err);
      res.status(400).json({
        status:"Failed",
        message: err.message
      });
    }
}

// get the applied post from companyid and userid -> so in frontend we can change the status

// adminId(companyId) / userId (uuid) / post id(_id / pid(in Applied)) // get STATUS

exports.getStatusofApplied = async(req,res,next) =>{
    try{
        
        const {pid,userId,companyId} = req.body;
        
        const checkApplied = await Applied.findOne({$and:[{
         pid:pid},{userId:userId},{companyId:companyId}]});
         console.log(checkApplied);
        successResponse(res,checkApplied,200);
    }catch(err){
        failedResponse(res,err,400);
    }
  } 
  exports.searchField = async(req,res,next)=>{
    try{
      console.log(req.params.search);
      console.log(req.query.name);
      const {searchfield} = req.body;
      let results = [];
       results = await Adminpost.aggregate([
        { $search: {
            index: 'default',
            text: {
            //   query: req.params.search,
              query: searchfield,
              path:["companyName","name","type","skills"],
              fuzzy: {"maxEdits": 1, "prefixLength": 1, "maxExpansions": 256},
                // path:{
                //   wildcard:"*"
                // },
            }
          }
        }
      ]);
      console.log(results);
  
      res.status(200).json({
          status:"success",
          results
      })
  
    }catch(err){
      
      res.status(404).json({
        status:"Failed",
        err:err.message
      })
  
    }
  }
  exports.autoComplete = async(req,res,next)=>{
    try{
  
      let result = [];
      const {searchfield} = req.body;
      results = await Adminpost.aggregate([
        // {
        //   '$search': {
        //     'index': 'autoComplete', 
        //     'autocomplete': {
        //       'query':searchfield,
        //       path:"name",
        //       "tokenOrder":"sequential"
        //     }
        //   }
        // }, {
        //   '$limit': 5
        // }, {
        //   '$project': {
        //     'name': 1,
        //   }
        // }
       { 
        "$search": {
          'index': 'autoComplete', 
          compound: {
              should: [
                  {
                      autocomplete: {
                          query:searchfield,
                          path: 'name',
                          fuzzy: {"maxEdits": 1, "prefixLength": 1, "maxExpansions": 256}
                      },
                  },
                  {
                      autocomplete: {
                          query:searchfield,
                          path: 'skills',
                          fuzzy: {"maxEdits": 1, "prefixLength": 1, "maxExpansions": 256}
                      },
                  },
                  {
                    autocomplete: {
                        query:searchfield,
                        path: 'companyName',
                        fuzzy: {"maxEdits": 1, "prefixLength": 1, "maxExpansions": 256}
                    },
                },
              ],
          },
      },
    },
    {$limit: 8},
      ])
      
      res.status(200).json({
        status:"success",
        results
      })
  
    }catch(err){
      res.status(404).json({
        status:"Failed",
        err:err.message
      })
    }
  }
// search 
/*


[
  {
    $search: {
      index: "default",
      text: {
        query: "john,robert,doc",
        path: {
          wildcard: "*"
        }
      }
    }
  }
]
*/

  

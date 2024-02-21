const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Profile = require("../model/profileModel");
const User = require("../model/userModel");

const storage = multer.memoryStorage();
const upload = multer({storage});

// exports.uploadLogo = upload.single('logo');
exports.picUpload = upload.single('pic');

exports.createJob = async(req,res,next)=>{
    try{
    console.log(req.body);
    // let url;
    
    // const b64 = Buffer.from(req.file.buffer).toString("base64");
    // let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    // // imageURL = req.file.filename;
    // // let imagePath = `https://cloudinary-devs.github.io/cld-docs-assets/assets/images/${imageURL}`;
    // let result = await cloudinary.uploader.upload(dataURI,{
    //   folder:"job-logo"
    // });
    // url = result.url;

    if(!req.user){
      throw new Error("Not logined in");
    }

        const profile = await Profile.create(req.body);

        const user = await User.findById(req.user);
        user.profile.unshift(profile._id);
        await user.save();

        res.status(200).json({
            status:"Success",
            data:{
              profile
            }
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

        // const user = await Profile.create(req.body);
        res.status(200).json({
            status:"Success",
            data:{
              detail
            }
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

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
    // console.log(req.body);
    // let url;
    const {
      name,mobile,linkedin,github,college_name,type,start,end,project,project_description,member,
      project_link
    } = req.body;


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
    let coins = 100;
    // calculating the coins that will reflect it in the user account 
    let calcCoins =coins + (name ? 1 : 0 ) +  (mobile ? 5 : 0) + (linkedin ? 3 : 0) + (github ? 3 : 0) + 
    (college_name ? 5 : 0) + (type ? 4 : 0) + (start ? 2 : 0) + (end ? 2 : 0) + (project ? 7  : 0) +
     (project_description ? 4 : 0) + (member ? 3 : 0) + (project_link ? 9: 0);


        const profile = await Profile.create(req.body);

        const user = await User.findById(req.user);
       calcCoins += user.coins;
        await User.findByIdAndUpdate(req.user,{coins:calcCoins});

        user.profile =profile._id;
        await user.save();

        res.status(200).json({
            status:"Success",
            profile
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
    // console.log(req.body);
    const user = await User.findById(req.user);

    let url;
    // console.log(req.file)
    if(req.file && req.file.fieldname === 'pic'){
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    let result = await cloudinary.uploader.upload(dataURI,{
      folder:"job-logo"
    });
    updatedData.pic = result.url;
    updatedData.coins = user.coins + 50; // 50 coins for adding the images
    } 
    
    

      const detail = await User.findByIdAndUpdate(req.user,updatedData,{
      run:true,
      runValidators:true
      })

        // const user = await Profile.create(req.body);
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

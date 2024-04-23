const jwt = require("jsonwebtoken");
// creating token using jwt 
const signToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET)
};


const sendCookiesAndToken = async (user,res,role='user') =>{
  // taking id of github profile
  // console.log(user._id);
  if(!user._id) throw new Error("Something went wrong!");
  const token = signToken(user._id);
  // console.log({token});

  // deleting the present cookies 
  /* problem i */

  let jwt = 'jwt';
  if(role==='admin'){
    jwt = 'admin';
  }
  // storing the token in cookie with the name 'jwt'
  await res.cookie(jwt,token,{
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    sameSite : "none",
    // secure : false // development
    secure: true   // prod
  });
 

}
module.exports = sendCookiesAndToken;
// const client = require("../utils/redisConnect");

// const redisCached = async (req,res,next)=>{
//     try{

//         const key =(req.originalUrl || req.url );

//         const cachedData = await client.get(key);
//         if(cachedData){
//             return res.send(JSON.parse(cachedData));
//         }
//         next();
//     }catch(err){
//         console.error("Failed to cached the data from Redis Cloud " + err);
//         next();
//     }
// }
// module.exports = redisCached;
const setDataInRedis = async (data)=>{
    const key = req.originalUrl || req.url;
    try{
      await client.set(key,JSON.stringify({data : data}),'ex',86400);
    }catch(err){
      console.error("Redis Error "+err);
    }
}
module.exports = setDataInRedis;

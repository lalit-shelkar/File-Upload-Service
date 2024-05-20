const cloudinary = require("cloudinary");

exports.cloudinaryConnect = ()=>{
    try{
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET,
        })
        console.log("clodinary connected succesgully");
    }catch(err){
        console.log(err);
        console.log("clodinary connection issues")
    }
}

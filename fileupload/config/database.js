const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = ()=>{
    mongoose.connect(process.env.DB_URL,{
        useNewurlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{console.log("db connection is successfull")})
    .catch((error)=>{
        console.log(error);
        process.exit(1);
    });
}

module.exports = dbConnect;
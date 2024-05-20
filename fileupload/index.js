const express = require("express");
const upload = require("express-fileupload");
const app = express();

app.use(express.json());
app.use(upload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
})); //file uploader middelewrae
require("dotenv").config();

const route = require("./routes/FILEUPLOAD");
app.use("/api/v1/upload",route);
const dbConnect = require("./config/database");
dbConnect();

const cloudinaryConnect = require("./config/cloudinary");//to store at media server
cloudinaryConnect.cloudinaryConnect();

app.listen(process.env.PORT,()=>{
    console.log("App is Running");
});

app.get("/",(req,res)=>{
    res.send("This is Home page");
});
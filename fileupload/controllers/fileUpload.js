const File = require("../models/File");
const localUpload = require("file-uploader");
const cloudinary = require("cloudinary").v2;

//local file upload
exports.localUploadFile = async(req,res)=>{
    const file = req.files.file;
    //store it in server path
    let path = __dirname + "/Files/" + Date.now() +`.${file.name.split('.')[1]}`;
    //store
    file.mv(path,(err)=>{
        console.log(err);
    });

    res.json({
        success:true,
        message:"file uploaded successfully"
    })
}


//cloudinary upload
//fun for typechecking
function isSupported(fileType,supported){
    if(!supported.includes(fileType)){
        return res.status(400).json({
            success:false,
            message:"File format is not supported"
        })
    }
}

//fun for uploading to cloudinary
async function uploadToCloudinary(file,folder){
    const options = {folder};
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath ,options);
}

//fun for mailing to user for successful upload
//we have to it after making entry in database ..so there are two types of middleware to perform actions after/before specific actions
//1]post 2]pre ............important:-- pre and post must be define before exporting or compiling ..lets go into model

//1] imageUpload
exports.imageUpload = async (req,res)=>{
    try{
        //fetching the name ,email,tags assosciated with file from req body and file from req files
        const {name,email,tags} = req.body;
       
        //validating
        if(!(req.files.imageFile && name && email && tags )){
            return res.status(400).json({
                success:false,
                message:"Fill all the fields ...File,name ,email ,tags"
            })
        }
        const file = req.files.imageFile;
        console.log(file);                                                                              //
        //validating supported type
        const supported = ["jpeg","jpg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        isSupported(fileType,supported);

        //file supported ,now upload to cloudinary
        const Cresponse = await uploadToCloudinary(file,"Codehelp");
        //DB entry
        console.log(Cresponse);
        const Dresponse = await File.create({name ,email ,tags ,imageURL:Cresponse.secure_url});
        
        res.status(200).json({
            success:true,
            imageURL:Cresponse.secure_url,
            message:"file uploaded successfully"
        })
        

    }catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })
    }
}
//2] videoUpload
exports.videoUpload = async (req,res)=>{
    try{
        //fetching the name ,email,tags assosciated with file from req body and file from req files
        const {name,email,tags} = req.body;
       
        //validating
        if(!(req.files.videoFile && name && email && tags )){
            return res.status(400).json({
                success:false,
                message:"Fill all the fields ...File,name ,email ,tags"
            })
        }
        const file = req.files.videoFile;
        console.log(file);                                                                              //
        //validating supported type
        const supported = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        isSupported(fileType,supported);

        //file supported ,now upload to cloudinary
        const Cresponse = await uploadToCloudinary(file,"Codehelp");
        //DB entry
        console.log(Cresponse);
        const Dresponse = await File.create({name ,email ,tags ,imageURL:Cresponse.secure_url});
        
        res.status(200).json({
            success:true,
            imageURL:Cresponse.secure_url,
            message:"file uploaded successfully"
        })
        

    }catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })
    }
}
//3] imageReduceUpload
exports.imageReduceUpload = async (req,res)=>{
    try{
        //fetching the name ,email,tags assosciated with file from req body and file from req files
        const {name,email,tags} = req.body;
       
        //validating
        if(!(req.files.imageFile && name && email && tags )){
            return res.status(400).json({
                success:false,
                message:"Fill all the fields ...File,name ,email ,tags"
            })
        }
        const file = req.files.imageFile;
        console.log(file);                                                                              //
        //validating supported type
        const supported = ["jpeg","jpg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        isSupported(fileType,supported);

        //file supported ,now upload to cloudinary
        const Cresponse = await uploadToCloudinary(file,"Codehelp");
        //DB entry
        console.log(Cresponse);
        const Dresponse = await File.create({name ,email ,tags ,imageURL:Cresponse.secure_url});
        
        res.status(200).json({
            success:true,
            imageURL:Cresponse.secure_url,
            message:"file uploaded successfully"
        })
        

    }catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })
    }
}


/*
{
  name: 'pexels-matheus-bertelli-3007436.jpg',
  data: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 01 00 48 00 48 00 00 ff e2 0c 58 49 43 43 5f 50 52 4f 46 49 4c 45 00 01 01 00 00 0c 48 4c 69 6e 6f 02 10 00 00 ... 1055531 more bytes>,
  size: 1055581,
  encoding: '7bit',
  tempFilePath: '',
  truncated: false,
  mimetype: 'image/jpeg',
  md5: '7533beb4be5342d7d012e971b0e40dbd',
  mv: [Function: mv]
} */
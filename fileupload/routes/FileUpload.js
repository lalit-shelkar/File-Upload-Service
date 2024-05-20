const express = require("express");
const router = express.Router();

const {localUploadFile,imageReduceUpload,videoUpload,imageUpload} = require("../controllers/fileUpload");

router.post("/localUploadFile",localUploadFile);//route for uploading file in local device
router.post("/imageUpload",imageUpload);//route for uploading image to cloudinary 
router.post("/videoUpload",videoUpload);//route for uploading video to cloudinary
router.post("/imageReduceUpload",imageReduceUpload);// route for uploading image by reducing quality ,size 


module.exports = router;
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageURL:{
        type:String,
    },
    tag:{
        type:String,
    },
    email:{
        type:String,
    }
})
//HERE defining middleware for schema after making entry in db ..DOC.is that entry returned
fileSchema.post("save",async(DOC)=>{
    //we have to send email ..first install nodemailer and make instace of it
    //3steps 1]create transporter using either SMTP or some other trasport mechanis SES transports
    //       2]Set up message options (who sends what to whom)
    //       3]Deliver the message object using the sendMail() method of your previously created transporter
    //now first we have to make transporter
    const transporter = nodemailer.createTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        auth:{
            user:"lalitshelkar2424@gmail.com",
            pass:process.env.MAIL_PASS
        }
    });
    await transporter.sendMail({
        from:"lalitshelkar2424@gmail.com",
        to:"rajshelkar24@gmail.com",
        subject:"testing nodemailer",
        text:"simple plain test...working",
        html:`<b>IMAGE UPLOADED SUCCESSFULLY <a href=${DOC.imageURL}>${DOC.imageURL}</a></b>`
    },(err)=>{
        console.log(err);
    });
});

module.exports = mongoose.model("File",fileSchema);
const mongoose=require("mongoose");

const anouncementSchema=new mongoose.Schema({
    date:{
        type:Date,
        required:[true,"Title is required"]
    },
    detail:{
        type:String,
        required:[true,"Detail is must required"]
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
},{timestamps:true})



module.exports=mongoose.model("Anouncement",anouncementSchema);
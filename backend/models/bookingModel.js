const mongoose=require("mongoose");

const bookingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"]
    },
    username:{
        type:String,
        required:[true,"User Name is required"]
    },
    mobileNumber:{
        type:String,
        required:[true,"Mobile number is required"],
        minLength:10,
        maxLength:10,
    },
    startdate:{
        type:Date,
        required:true
    },
    enddate:{
        type:Date,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
},{timestamps:true})



module.exports=mongoose.model("Booking",bookingSchema);
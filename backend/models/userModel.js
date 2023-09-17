const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    surname:{
        type:String,
        required:[true,"Surname is required"]
    },
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    fatherName:{
        type:String,
        required:[true,"Father Name is required"]
    },
    mobileNumber:{
        type:String,
        required:[true,"Mobile number is required"],
        maxlength: 10,
        minlength: 10,
        unique:true
    },
    whatsappNumber:{
        type:String,
        required:[true,"Whatsapp number is required"],
        maxlength: 10,
        minlength: 10,  
        unique:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
},{timeStamps:true}
)

module.exports=mongoose.model("Member",userSchema);
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const registerSchema=new mongoose.Schema({
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
        required:[true,"Father name is required"]
    },
    mobileNumber:{
        type:String,
        required:[true,"Mobile number is required"],
        minLength:10,
        maxLength:10,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
},{timestamps:true})

registerSchema.pre("save",async function(){
        this.password=await bcrypt.hash(this.password,12);
})

module.exports=mongoose.model("Register",registerSchema);
const mongoose=require("mongoose")
require("dotenv").config()

const {MONGO_URL}=process.env

mongoose.connect(MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log("Database Connection Successfully"))
.catch(()=>console.log("Some kind of error"))
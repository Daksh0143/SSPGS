const Anouncement = require("../models/anouncementModel")

module.exports.Anounce = async (req, res) => {
    try {
        const anouncment = new Anouncement(req.body);
        await anouncment.save();
        res.status(201).json({ message: "Success", anouncment })
        console.log(anouncment)
    } catch (error) {
        res.status(501).json({error:"error"})
        console.log(error)
    }
}

module.exports.GetAnounce=async(req,res)=>{
    try {
        const anouncment=await Anouncement.find();
        res.status(201).json({message:"Success",anouncment})
    } catch (error) {
        res.status(501).json({message:"fail",error})
    }
}


module.exports.DeleteAnounce=async(req,res)=>{
    try {
        const {id} =req.params

        const deleteAnouncement=await Anouncement.findByIdAndDelete(id)
        if(!deleteAnouncement){
            return res.status(404).json({message:"Anouncement not found"})
            
        }
        res.status(201).json({message:"Anouncement Deleted",deleteAnouncement})
        console.log(deleteAnouncement)
    } catch (error) {
        res.status(501).json({message:"Fail",error:error.message})
    }
}
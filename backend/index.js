const express = require("express")
const user = require("./models/userModel")
require("dotenv").config()
const app = express();
const { PORT } = process.env
require("./database/db")
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./Routes/AuthRotes")
const adminRoute=require("./Routes/AdminRoutes")
const eventRoute=require("./Routes/EventRoutes")
const anouncementRoute=require("./Routes/AnouncementRoute")

app.use(express.json())
app.use(cors())
app.use(express.static(__dirname + "/public/"));
app.use(cookieParser())

app.post("/about", async (req, res) => {
    const { surname, name, fatherName, mobileNumber, whatsappNumber } = req.body
    try {
        const newUser = new user({
            surname, name, fatherName, mobileNumber, whatsappNumber
        });
        const savedUser = await newUser.save();
        // console.log("User Saved",savedUser);
        res.status(201).json(savedUser)
    } catch (error) {
        console.log(error)
        res.status(501).send(error)
    }
})

app.get("/member", async (req, res) => {
    try {
        const data = await user.find()
        const result = res.send(data);
        // console.log(data)
    } catch (error) {
        res.status(501).send(error)
        console.log(error)
    }
})

app.delete("/member/:id", async (req, res) => {
    
    try {
        const id = req.params.id;

        if (id) {
            const isDeleted = await user.findByIdAndDelete(id);
            console.log(isDeleted);
            res.status(200).json({ status: "success", message: "member deleted successfully" })
        }
        else {
            res.status(400).json({ status: "fail", message: "please provide valid id" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "fail", message: "internal server error" })
    }
})

app.get("/member/:id", async (req, res) => {
    try {
        let result = await user.findOne({ _id: req.params.id });
        res.status(200).json({ status: "success", result })
    } catch (error) {
        res.status(501).json({ message: "Internal Server Error", status: "fail" })
    }
})

app.put("/member/:id", async (req, res) => {
    try {
        let result = await user.updateOne(
            { _id: req.params.id }, { $set: req.body })
        res.status(201).json({message:"Updated Successfully",status:"updated",result})
        console.log(result)
    } catch (error) {
        res.status(501).json({message:"Internal Update Srever Problem ",status:"fail"})
    }

})

app.use("/", authRoute)
app.use("/admin",adminRoute)
app.use("/admin",eventRoute)
app.use("/admin",anouncementRoute)


app.listen(PORT, () => {
    console.log(`Port is Listening on ${PORT}`)
})
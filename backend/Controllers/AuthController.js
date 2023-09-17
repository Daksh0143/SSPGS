const Signup = require("../models/loginModel");
const AdminRegister = require("../models/adminLoginModel")
const { createSecretToken } = require("../util/secretToken")
const bcrypt = require("bcrypt")

module.exports.Signup = async (req, res) => {
    try {
        const { surname, name, fatherName, mobileNumber, password, createdAt } = req.body
        const existingUser = await Signup.findOne({ mobileNumber })
        if (existingUser) {
            console.log("User Already Exist")
            return res.json({ messge: "User already Exists" })
        }
        const user = await Signup.create({ surname, name, fatherName, mobileNumber, password, createdAt })

        const token = createSecretToken(user._id);
        res.cookie("token", token);
        res.status(201).json({ message: "User Signed in Successfully", success: true, user })
    } catch (error) {
        console.log("error", error)
    }
}


module.exports.Login = async (req, res) => {
    try {
        const { mobileNumber, password } = req.body
        if (!mobileNumber || !password) {
            return res.json({ message: "All Fields are required" })
        }
        const user = await Signup.findOne({ mobileNumber });
        console.log(user)
        if (!user) {
            return res.json({ message: "Incorrect Mobile Number" })
        }
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.json({ message: "Incorrect Password " })
        }
        const token = createSecretToken(user._id);

        console.log(token)
        res.cookie("jwt", token);

        res.status(201).json({ message: "User Logged in Successfully", success: true })
    } catch (error) {
        console.log(error)
    }
}


module.exports.AdminRegister = async (req, res) => {
    try {
        const { surname, name, fatherName, mobileNumber, password, createdAt } = req.body
        const existingUser = await AdminRegister.findOne({ mobileNumber })
        if (existingUser) {
            console.log("User Already Exist")
            return res.json({ messge: "User already Exists" })
        }
        const user = await AdminRegister.create({ surname, name, fatherName, mobileNumber, password, createdAt })
        console.log(user)
        const token = createSecretToken(user._id);
        res.cookie("token", token);
        res.status(201).json({ message: "User Signed in Successfully", success: true, user })
    } catch (error) {
        console.log("error", error)
    }
}

module.exports.AdminLogin = async (req, res) => {
    try {
        const { mobileNumber, password } = req.body
        if (!mobileNumber || !password) {
            return res.json({ message: "All Fields are required" })
        }
        const user = await AdminRegister.findOne({ mobileNumber });
        console.log(user)
        if (!user) {
            return res.json({ message: "Incorrect Mobile Number" })
        }
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.json({ message: "Incorrect Password " })
        }
        const token = createSecretToken(user._id);

        console.log(token)
        res.cookie("jwt", token);

        res.status(201).json({ message: "User Logged in Successfully", success: true })
    } catch (error) {
        console.log(error)
    }
}
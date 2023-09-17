const {AdminRegister,AdminLogin} =require("../Controllers/AuthController");

const router=require("express").Router();


router.post("/register",AdminRegister);
router.post("/login", AdminLogin);

module.exports=router;

const {Anounce,GetAnounce,DeleteAnounce}=require("../Controllers/AnouncementController")

const router=require("express").Router();

router.post("/home",Anounce)
router.get("/anouncement",GetAnounce)
router.delete("/anouncement/:id",DeleteAnounce)

module.exports=router;
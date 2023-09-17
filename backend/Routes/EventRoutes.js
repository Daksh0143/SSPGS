const {Booking, GetAllBooking, GetSingleBooking}= require("../Controllers/EventController")

const router=require("express").Router();

const upload = require("../helpers/uploadFile")

router.post("/addEvent",upload.single("image"),Booking)


router.get("/events",GetAllBooking)

router.get("/events/:id",GetSingleBooking)

module.exports =router;
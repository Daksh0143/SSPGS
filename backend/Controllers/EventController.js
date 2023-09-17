const Event =require ("../models/bookingModel")


module.exports.Booking=async(req,res)=>{
    console.log(req.file)
    console.log(req.body)

    try {
        const data = JSON.parse(req.body.data);

        console.log(data);

        console.log("data",data)

        const imagePath=req.file ? req.file.filename : null;
        
        const obj = {...data,image:imagePath};

        console.log("obj",obj)
        const newEvent=new Event(obj)

        const savedEvent=await newEvent.save();
        console.log(savedEvent)
        res.status(201).json({message:"Success",savedEvent})
        console.log(savedEvent)
    } catch (error) {
        console.log("calling event funcition<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
        console.log(error)
        res.status(501).json({message:"fail"})
    }
}

module.exports.GetAllBooking=async(req,res)=>{

    try {
        const imagePath= process.env.STATIC_BASE_URL;

        console.log(imagePath)
        const events = await Event.find({});

        const myData = events.map((event)=>{
            return {...event._doc,image: imagePath + event.image}
        })
        console.log(myData)

        res.status(201).json({message:"Success",data: myData})
    } catch (error) {
        console.log("calling event funcition<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
        console.log(error)
        res.status(501).json({message:"fail"})
    }
}

module.exports.GetSingleBooking=async(req,res)=>{

    const id = req.params.id;

    try {
        const imagePath= process.env.STATIC_BASE_URL;

        console.log(imagePath)
        const events = await Event.findById(id);

        const myData = {...events._doc,image: imagePath + events.image};
        
        console.log(myData)

        res.status(201).json({message:"Success",data: myData})
    } catch (error) {
        console.log(error)
        res.status(501).json({message:"fail"})
    }
}


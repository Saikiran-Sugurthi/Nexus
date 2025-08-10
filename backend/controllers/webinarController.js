const asyncHandler = require("express-async-handler");
const Webinar = require("../models/webinarModel"); 


const createWebinar = asyncHandler(async (req, res) => {
   
    const { title, description, dateTime, isPrivate } = req.body;

    if (!title || !description || !dateTime) {
        res.status(400);
        throw new Error("Please provide title, description, and dateTime for the webinar.");
    }

    
    const webinar = await Webinar.create({
        title,
        description,
        dateTime,
        isPrivate,
        hostId: req.user._id, 
    });

    if (webinar) {
        res.status(201).json(webinar);
    } else {
        res.status(400);
        throw new Error("Invalid webinar data.");
    }
});

const getWebinars=asyncHandler(async(req,res)=>{


    const webinars=await Webinar.find({}).populate("hostId","name pic email").sort({dateTime:-1})

    
        res.status(200).json(webinars);
    

})

const registerWebinar=asyncHandler(async(req,res)=>{
    const webinarId=req.params.id;
    
    const userId=req.user._id;

    const updatedWebinar=await Webinar.findByIdAndUpdate(webinarId,{$addToSet:{attendees:userId}},{new:true})
                                        .populate("hostId","name pic")
                                        .populate("attendees","name pic");

    if(updatedWebinar){
        res.status(200).json(updatedWebinar);
    }else{
        res.status(404);
        throw new Error("Webinar Not Found!!");
    }
})


module.exports = {
    createWebinar,
    getWebinars,
    registerWebinar

};

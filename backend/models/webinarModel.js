const mongoose = require("mongoose");



const webinarSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true // Removes whitespace from both ends of a string.
    },
    description: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    },
    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    attendees: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isPrivate: {
        type: Boolean,
        default: false
    },
   
    recordingLink: {
        type: String,
        trim: true,
        default: ""
    }
}, {
    //  Automatically add createdAt and updatedAt fields.
    timestamps: true
});


const Webinar = mongoose.model("Webinar", webinarSchema);

module.exports = Webinar;

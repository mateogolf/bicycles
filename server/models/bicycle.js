const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    // User = require('./user')
    // Schema = mongoose.Schema,
    BicycleSchema = new mongoose.Schema({
        title:{
            type:String,
            required: [true, "Title is required"]
        },
        description:{
            type:String,
            required: true,
            maxlength: 200,
        },
        price:{
            type:Number,
            required: [true, "Price is required"]
        },
        location:{
            type:String,
            required: [true, "Location is required"]
        },
        image_url:{
            type:String,
        },
        _user: {type:Schema.Types.ObjectId, ref:'User'}
    },{timestamps:true})

mongoose.model("Bike", BicycleSchema)
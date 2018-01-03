const mongoose = require('mongoose'),
    textSearch = require('mongoose-text-search'),

    Schema = mongoose.Schema,
    // User = require('./user')
    // Schema = mongoose.Schema,
    BicycleSchema = new mongoose.Schema({
        title:{
            type:String,
            required: [true, "Title is required"],
            // index:true
        },
        description:{
            type:String,
            required: true,
            maxlength: 200,
            // index: true,
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
    },{timestamps:true});
BicycleSchema.plugin(textSearch);
BicycleSchema.index({ title: 'text', description: 'text',location:'text' });
mongoose.model("Bike", BicycleSchema)
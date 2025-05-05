const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema ({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
    },
    location:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        default:"Muzaffarpur",
    },
    type:{
        type:String,
        required:true,
    },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
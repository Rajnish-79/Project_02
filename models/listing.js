const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema ({
    title:{
        type:String,
        require:true,
    },
    description:String,
    image:{
        type:String,
        require:true,
    },
    location:{
        type:String,
        require:true,
    },
    city:{
        type:String,
        default:"Muzaffarpur",
    },
    type:{
        type:String,
        require:true,
    },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
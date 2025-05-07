const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const ejsMate =require("ejs-mate")


const MONGO_URL = "mongodb://localhost:27017/Unseen_Muzaffarpur";

main().then(() =>{
    console.log("Connected to DB");
}).catch(err =>{
    console.log(err);
});
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
// app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

async function main(){
    await mongoose.connect(MONGO_URL);   
}
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));


app.get("/" ,(req,res) =>{
    res.render("./listings/index.ejs")
});
app.get("/team", (req,res) =>{
    res.render("./listings/team.ejs");
});
app.get("/resturants", (req,res) =>{
    res.render("./listings/resturants.ejs");
});
app.get("/religious_place", (req,res) =>{
    res.render("./listings/religious_place.ejs");
});
app.get("/park", (req,res) =>{
    res.render("./listings/park.ejs");
});
app.get("/hotel", (req,res) =>{
    res.render("./listings/hotel.ejs");
});
app.get("/admin", (req,res) =>{
    res.render("./listings/admin/admin.ejs");
});
app.get("/mall",async (req,res) =>{
    const allListings = await Listing.find({});
    res.render("./listings/mall.ejs",{allListings});
});

// app.get("/", async(req,res) =>{
//    const allListings = await Listing.find({});
//    res.render("./listings/index.ejs", {allListings});
// });

app.listen( 9090, ()=>{
    console.log("Server is listening to port 9090 ");
});
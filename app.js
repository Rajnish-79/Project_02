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

app.get("/resturants", async(req,res) =>{
    const allResturants = await Listing.find({type:"Restaurant"})
    res.render("./listings/resturants.ejs",{allResturants});
});

app.get("/religious_place", async (req,res) =>{
    const allReligious = await Listing.find({type:"Religious"});
    res.render("./listings/religious_place.ejs",{allReligious});
});

app.get("/park", async(req,res) =>{
    const allPark = await  Listing.find({type:"Park"});
    res.render("./listings/park.ejs",{allPark});
});

app.get("/hotel", async(req,res) =>{
    const allHotel = await Listing.find({type:"Hotel"});
    res.render("./listings/hotel.ejs",{allHotel});
});

app.get("/admin", (req,res) =>{
    res.render("./listings/admin/admin.ejs");
});

app.get("/mall",async (req,res) =>{
    const allMall = await Listing.find({type:"Mall"});
    res.render("./listings/mall.ejs",{allMall});
});



app.listen( 9090, ()=>{
    console.log("Server is listening to port 9090 ");
});
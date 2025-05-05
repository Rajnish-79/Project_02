const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const ejsMate =require("ejs-mate")


const MONGO_URL = "mongodb://localhost:27017/Our_Muzaffarpur";

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
})
app.get("/mall",(req,res) =>{
    console.log("Working");
    res.render("./listings/mall.ejs");
});

// app.get("/", async(req,res) =>{
//    const allListings = await Listing.find({});
//    res.render("./listings/index.ejs", {allListings});
// });

app.listen( 9090, ()=>{
    console.log("Server is listening to port 9090 ");
});
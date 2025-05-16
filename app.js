const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require('dotenv');
const connectDB = require("./config/db.js");
const methodOverride = require("method-override");
const ejsMate =require("ejs-mate");
const ExpressError = require("./ExpressError.js");
const User = require('./models/user.js');
const PORT = process.env.PORT || 9090;

dotenv.config();
connectDB();

function isLoggedIn(req, res, next) {
  if (req.session.isAuthenticated) {
    return next();
  }
  res.redirect("/login");
}



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());


app.use(session({
  secret: process.env.SESSION_SECRET || 'secret123',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 2 } // 2 hours
}));



app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));


app.post("/search", async (req, res) => {
  const { type, location } = req.body;

  const results= await Listing.find({type:type});
  if(results.length === 0){
    return res.render("listings/not_found.ejs");
  }
  res.render("listings/search_result.ejs", { results });
});
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

app.get("/login", (req,res) =>{
    res.render("./listings/login.ejs");
});

app.get("/mall",async (req,res) =>{
    const allMall = await Listing.find({type:"Mall"});
    res.render("./listings/mall.ejs",{allMall});
});

// Login Routes
app.post("/login/allPlaces", async (req, res) => {
  const { username, password } = req.body;

  // Hardcoded or DB-based check
  if (username === "OnlyTeam" && password === "474910") {
    req.session.isAuthenticated = true;
    req.session.user = { username: "OnlyTeam", role: "admin" };
    
    const allPlaces = await Listing.find({});
    return res.render("./login/all_places.ejs", { allPlaces });
  }

  return res.render("./listings/loginHelp.ejs");
});
app.get("/login/allPlaces",isLoggedIn,async(req,res) =>{
    const allPlaces = await Listing.find({});
    res.render("./login/all_places.ejs", { allPlaces });
});
//Add new Places
app.get("/login/allPlaces/new",isLoggedIn, (req,res) =>{
    res.render("./login/new.ejs");
});
//All Places
app.post("/login/allPlaces/add", isLoggedIn, async (req, res) => {
  const newPlace = new Listing(req.body.add); // now it grabs all fields
  await newPlace.save();
  res.redirect("/login/allPlaces");
});
  //Show Routes
  app.get("/login/allPlaces/:id",isLoggedIn,async (req,res) =>{
    let {id} = req.params;
    const place = await Listing.findById(id);
    res.render("./login/show.ejs", {place});
});
//Edit Routes
app.get("/login/allPlaces/:id/edit",isLoggedIn, async (req,res) =>{
    let {id} = req.params;
    const place = await Listing.findById(id);
    res.render("./login/edit.ejs", {place});
});
// Update routes
app.put("/login/allPlaces/:id",isLoggedIn, async (req,res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing, {runValidators: true});
    res.redirect(`/login/allPlaces`);
});
//Delete Route
app.delete("/login/allPlaces/:id",isLoggedIn, async (req,res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect("/login/allPlaces");
});
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("http://localhost:9090/");
});



app.listen( PORT, ()=>{
    console.log(`Server is listening to port ${PORT} `);
});
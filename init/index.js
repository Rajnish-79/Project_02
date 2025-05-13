const mongoose = require("mongoose");
const initData = require("./data.js");
const dotenv = require('dotenv').config();;
const connectDB = require("../config/db.js");
const Listing = require("../models/listing.js");

connectDB();

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};
initDB();

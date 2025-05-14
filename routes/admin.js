const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth.js');

// Sample admin route
router.get('/login/allPlaces', verifyToken, isAdmin, async(req, res) => {
    const allPlaces = await Listing.find({});
    return res.render("./login/all_places.ejs", { allPlaces });
});

module.exports = router;

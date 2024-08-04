const express = require("express");
const router = express.Router();
const MenuItem = require("../Models/MenuItem");
const auth = require("../Middleware/authentication");

router.get("/allMenuItems",auth, async (req, res, next) => {
  const allItems = await MenuItem.findAll();
  if (allItems) {
    res.status(200).json({allItems:allItems});
  } else {
    res.status(400).json({message:"No items found"});
  }
});

module.exports = router;

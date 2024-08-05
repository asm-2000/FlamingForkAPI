const express = require("express");
const router = express.Router();
const MenuItem = require("../Models/MenuItem");
const auth = require("../Middleware/authentication");

router.get("/allMenuItems", auth, async (req, res, next) => {
  const allItems = await MenuItem.findAll();
  if (allItems) {
    res.status(200).json({ allItems: allItems });
  } else {
    res.status(400).json({ message: "No items found" });
  }
});

router.post("/addMenuItem",auth, async (req, res) => {
  const { itemname, itemprice, itemdescription, itemcategory, itemimageurl } =
    req.body;

  if (req.body) {
    try {
      const existItem = MenuItem.findOne({ where: { itemname: itemname } });
      if (existItem > 0) {
        res.status(400).json({ message: "Item of same name already exists!" });
      } else {
        await MenuItem.create({
          itemname,
          itemprice,
          itemdescription,
          itemcategory,
          itemimageurl,
        });
        res.status(201).json({ message: "Successfully added Menu Item!" });
      }
    } catch {
      res.status(500).json({ message: "Server Error: Cannot add item!" });
    }
  } else {
    res.status(400).json({ message: "Null values provided!" });
  }
});

router.put("/updateMenuItem/:id", auth, async (req, res) => {
  const { id } = req.params;
  const newItem = req.body;

  try {
    const result = await MenuItem.update(newItem, { where: { itemid: id } });
    if (result[0] > 0) {
      res.status(200).json({ message: "Item replaced successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/deleteMenuItem/:id",auth, async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await MenuItem.destroy({
      where: { itemid: id },
    });
    if (result > 0) {
      res.status(200).json({ message: "Item deleted successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

module.exports = router;


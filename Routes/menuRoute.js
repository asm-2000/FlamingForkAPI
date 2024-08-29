const express = require("express");
const router = express.Router();
const MenuItem = require("../Models/MenuItem");
const auth = require("../Middleware/authentication");

router.get("/allMenuItems",auth, async (req, res, next) => {
  const allItems = await MenuItem.findAll({ raw: true });
  JSON.stringify(allItems);
  if (allItems) {
    res.status(200).json({ allMenuItems: allItems });
  } else {
    res.status(400).json({ message: "No items found" });
  }
});

router.post("/addMenuItem", auth, async (req, res, next) => {
  const { itemName, itemPrice, itemCategory, itemImageUrl } = req.body;
  if (req.body) {
    try {
      await MenuItem.create({
        itemname: itemName,
        itemprice: itemPrice,
        itemdescription: "Empty",
        itemcategory: itemCategory,
        itemimageurl: itemImageUrl,
      });
      res.status(201).json({ message: "Successfully added Menu Item!" });
    } catch(error) {
      next(error);
    }
  } else {
    res.status(400).json({ message: "Null values provided!" });
  }
});

router.put("/updateMenuItem", auth, async (req, res) => {
  const {
    itemId,
    itemName,
    itemPrice,
    itemDescription,
    itemCategory,
    itemImageUrl,
  } = req.body;
  console.log(itemImageUrl);
  const newItem = {
    itemid: itemId,
    itemname: itemName,
    itemprice: itemPrice,
    itemdescription: itemDescription,
    itemcategory: itemCategory,
    itemimageurl: itemImageUrl,
  };
  try {
    const result = await MenuItem.update(newItem, {
      where: { itemid: newItem.itemid },
    });
    if (result[0] > 0) {
      res.status(200).json({ message: "Updated Item Details successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/deleteMenuItem/:itemId", auth, async (req, res, next) => {
  const { itemId } = req.params;

  try {
    const result = await MenuItem.destroy({
      where: { itemid: itemId },
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
  console.log(error.message);
  res.status(500).json({ message: error.message });
});

module.exports = router;

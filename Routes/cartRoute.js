const express = require("express");
const router = express.Router();
const Cart = require("../Models/Cart");
const auth = require("../Middleware/authentication");

router.get("/userCart/:customerId", auth, async (req, res, next) => {
  const { customerId } = req.params;
  try {
    const userCart = Cart.findOne({ where: { customerid: customerId } });
    if (userCart) {
      res.status(200).json(userCart);
    } else res.status(404).json({ message: "Cart is empty!" });
  } catch (error) {
    next(error);
  }
});

router.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const CartItem = require("../Models/Cart");
const auth = require("../Middleware/authentication");

// Handler to get all the cart items of a specific customer.

router.get("/userCart/:customerId", auth, async (req, res, next) => {
  const { customerId } = req.params;
  try {
    const userCartItems = await CartItem.findAll({
      where: { customerid: customerId },
    });
    if (userCart) {
      res.status(200).json(userCartItems);
    } else res.status(404).json({ message: "Cart is empty!" });
  } catch (error) {
    next(error);
  }
});

// Handler to save the cart item of a customer.

router.post("/saveCartItem", auth, async (req, res, next) => {
  const { customerid, cartitemname, cartitemprice, quantity } = req.body;
  try {
    await CartItem.create({
      customerid,
      cartitemname,
      cartitemprice,
      quantity,
    });
  } catch (error) {
    next(error);
  }
});

// Handler to clear customer's cart.

router.delete("/clearCartItems/:customerId", auth, async (req, res, next) => {
  const { customerId } = req.params;
  try {
    await CartItem.destroy({
      where: { customerid: customerId },
    });
  } catch (error) {
    next(error);
  }
});

// Handler to delete an item from customers cart.

router.delete("/deleteCartItem/:customerId", auth, async (req, res, next) => {
  const { customerId } = req.params;
  const { cartitemid } = req.body;
  try {
    await CartItem.destroy({
      where: { customerid: customerId, cartitemid:cartitemid },
    });
  } catch (error) {
    next(error);
  }
});

router.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

module.exports = router;

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
  const { customerId, cartItemName, cartItemPrice, quantity } = req.body;
  try {
    const existItem = await CartItem.findOne({
      where: { customerid: customerId, cartitemname: cartItemName },
    });
    if (existItem) {
      const cartItem = {
        cartitemid: existItem.cartitemid,
        customerid: customerId,
        cartitemname: cartItemName,
        cartitemprice: cartItemPrice,
        quantity: quantity + existItem.quantity,
      };
      await CartItem.update(cartItem, {
        where: { customerid: customerId, cartitemname: cartItemName },
      });
    } else {
      await CartItem.create({
        customerid:customerId,
        cartitemname:cartItemName,
        cartitemprice:cartItemPrice,
        quantity:quantity,
      });
    }
    res.status(201).json({ message: "Item added to cart successfully!" });
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
    res.status(201).json({ message: "Cleared user's cart successfully!" });
  } catch (error) {
    next(error);
  }
});

// Handler to delete an item from customers cart.

router.delete("/deleteCartItem/:customerId", auth, async (req, res, next) => {
  const { customerId } = req.params;
  const { cartItemId } = req.body;
  try {
    await CartItem.destroy({
      where: { customerid: customerId, cartitemid: cartItemId },
    });
    res.status(202).json({ message: "Deleted item sucessfully!" });
  } catch (error) {
    next(error);
  }
});

router.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

module.exports = router;

const express = require("express");
const CustomerOrder = require("../Models/Order");
const OrderItem = require("../Models/OrderItem");
const auth = require("../Middleware/authentication");
const { where } = require("sequelize");
const router = express.Router();

// Handler to get all active orders (Admin side)

router.get("/activeOrders", auth, async (req, res, next) => {
  try {
    const allPlacedOrders = await CustomerOrder.findAll({
      where: { orderstatus: "placed" },
    });
    if (allPlacedOrders) {
      const orders = await Promise.all(
        allPlacedOrders.map(async (placedOrder) => {
          const alItemsInPlacedOrder = await OrderItem.findAll({
            where: { orderid: placedOrder.orderid },
          });

          return {
            orderid: placedOrder.orderid,
            customercontact: placedOrder.customercontact,
            customeraddress: placedOrder.customeraddress,
            items: alItemsInPlacedOrder,
          };
        })
      );
      if (orders.length > 0) {
        res.status(200).json({
          message: "Fetched all active orders",
          orders,
        });
      } else {
        res.status(200).json({ message: "No active orders!" });
      }
    }
  } catch (error) {
    next(error);
  }
});

// Handler to get all completed orders (Admin side)

router.get("/completedOrders", auth, async (req, res, next) => {
  try {
    const allCompletedOrders = await CustomerOrder.findAll({
      where: { orderstatus: "completed" },
    });
    if (allCompletedOrders) {
      const orders = await Promise.all(
        allCompletedOrders.map(async (completedOrder) => {
          const alItemsInCompletedOrder = await OrderItem.findAll({
            where: { orderid: completedOrder.orderid },
          });

          return {
            orderid: completedOrder.orderid,
            customercontact: completedOrder.customercontact,
            customeraddress: completedOrder.Customeraddress,
            items: alItemsInCompletedOrder,
          };
        })
      );
      if (orders.length > 0) {
        res.status(200).json({
          message: "Fetched all completed orders",
          orders,
        });
      } else {
        res.status(200).json({ message: "No completed orders!" });
      }
    }
  } catch (error) {
    next(error);
  }
});

// Handler to get all cancelled orders (Admin side)

router.get("/cancelledOrders", auth, async (req, res, next) => {
  try {
    const allCancelledOrders = await CustomerOrder.findAll({
      where: { orderstatus: "cancelled" },
    });
    if (allCancelledOrders) {
      const orders = await Promise.all(
        allCancelledOrders.map(async (cancelledOrder) => {
          const alItemsInCancelledOrder = await OrderItem.findAll({
            where: { orderid: cancelledOrder.orderid },
          });

          return {
            orderid: cancelledOrder.orderid,
            customercontact: cancelledOrder.customercontact,
            customeraddress: cancelledOrder.Customeraddress,
            items: alItemsInCancelledOrder,
          };
        })
      );
      if (orders.length > 0) {
        res.status(200).json({
          message: "Fetched all cancelled orders",
          orders,
        });
      } else {
        res.status(200).json({ message: "No cancelled orders!" });
      }
    }
  } catch (error) {
    next(error);
  }
});

// Handler to change the status of the order

router.put("/changeOrderStatus", auth, async (req, res, next) => {
  const { orderId, customerId, customerContact, customerAddress, orderStatus } =
    req.body;
  const customerOrder = {
    orderid: orderId,
    customerid: customerId,
    customercontact: customerContact,
    customeraddress: customerAddress,
    orderstatus: orderStatus,
  };
  try {
    const updated = await CustomerOrder.update(customerOrder, {
      where: { customerid: customerOrder.customerid },
    });
    if (updated[0] > 0) {
      res.status(200).json({ message: "Status updated sucessfully!" });
    } else res.status(404).json({ message: "Order not found!" });
  } catch (error) {
    next(error);
  }
});

//Handler to place a customer order

router.post("/placeCustomerOrder", auth, async (req, res, next) => {
  const {
    customerId,
    customerContact,
    customerAddress,
    orderStatus,
    orderItems,
  } = req.body;
  try {
    const order = await CustomerOrder.create({
      customerid: customerId,
      customercontact: customerContact,
      customeraddress: customerAddress,
      orderstatus: orderStatus,
    });
    orderItems.map(async (orderItem) => {
      await OrderItem.create({
        orderid: order.orderid,
        orderitemname: orderItem.orderitemname,
        orderitemprice: orderItem.orderitemprice,
        quantity: orderItem.quantity,
      });
    });
    res.status(201).json({ message: "Order placed sucessfully!" });
  } catch (error) {
    next(error);
  }
});

// Internal error handler

router.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

module.exports = router;

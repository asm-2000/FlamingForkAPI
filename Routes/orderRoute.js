const express = require("express");
const CustomerOrder = require("../Models/Order");
const OrderItem = require("../Models/OrderItem");
const auth = require("../Middleware/authentication");
const { where } = require("sequelize");
const router = express.Router();

// Handler to get all active orders (Admin side).

router.get("/activeOrders", auth, async (req, res, next) => {
  try {
    const allPlacedOrders = await CustomerOrder.findAll({
      where: { orderstatus: "placed" },raw:true
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
            orderdate: placedOrder.orderdate
          };
        })
      );
      if (orders.length > 0) {
        res.status(200).json({ orders });
      } else {
        res.status(200).json({ message: "No active orders!" });
      }
    }
  } catch (error) {
    next(error);
  }
});

// Handler to get all completed orders (Admin side).

router.get("/completedOrders", auth, async (req, res, next) => {
  try {
    const allCompletedOrders = await CustomerOrder.findAll({
      where: { orderstatus: "completed" },raw:true
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
            orderdate: completedOrder.orderdate
          };
        })
      );
      if (orders.length > 0) {
        res.status(200).json({ orders });
      } else {
        res.status(200).json({ message: "No completed orders!" });
      }
    }
  } catch (error) {
    next(error);
  }
});

// Handler to get all cancelled orders (Admin side).

router.get("/cancelledOrders", auth, async (req, res, next) => {
  try {
    const allCancelledOrders = await CustomerOrder.findAll({
      where: { orderstatus: "cancelled" },raw:true
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
            orderdate: cancelledOrder.orderdate
          };
        })
      );
      if (orders.length > 0) {
        res.status(200).json({ orders });
      } else {
        res.status(200).json({ message: "No cancelled orders!" });
      }
    }
  } catch (error) {
    next(error);
  }
});

// Handler to change the status of the order.

router.put("/changeOrderStatus", auth, async (req, res, next) => {
  const { orderId, customerId, customerContact, customerAddress, orderStatus, orderDate } =
    req.body;
    console.log(req.body);
  const customerOrder = {
    orderid: orderId,
    customerid: customerId,
    customercontact: customerContact,
    customeraddress: customerAddress,
    orderstatus: orderStatus,
    orderdate: orderDate
  };
    try {
      const updated = await CustomerOrder.update(customerOrder, {
        where: { customerid: customerOrder.customerid, orderid: customerOrder.orderid },
      });
      if (updated[0] > 0) {
        res.status(200).json({ message: "Status updated sucessfully!" });
      } else res.status(404).json({ message: "Order not found!" });
    } catch (error) {
      next(error);
    }
});

//Handler to place a customer order.

router.post("/placeCustomerOrder", auth, async (req, res, next) => {
  const {
    customerId,
    customerContact,
    customerAddress,
    orderStatus,
    orderItems,
    orderDate
  } = req.body;
  try {
    const order = await CustomerOrder.create({
      customerid: customerId,
      customercontact: customerContact,
      customeraddress: customerAddress,
      orderstatus: orderStatus,
      orderdate: orderDate
    });
    orderItems.map(async (orderItem) => {
      await OrderItem.create({
        orderid: order.orderid,
        orderitemname: orderItem.orderItemName,
        orderitemprice: orderItem.orderItemPrice,
        quantity: orderItem.quantity,
      });
    });
    res.status(201).json({ message: "Order placed sucessfully!" });
  } catch (error) {
    next(error);
  }
});

// Handler to return all the orders of a customer.

router.get("/customerOrders/:customerId", auth, async (req, res, next) => {
  const { customerId } = req.params;
  try {
    const allCustomerOrders = await CustomerOrder.findAll({
      where: { customerid: customerId }, raw:true,
    });
    console.log(allCustomerOrders);
    if (allCustomerOrders) {
      const orders = await Promise.all(
        allCustomerOrders.map(async (customerOrder) => {
          const allItemsInCustomerOrder = await OrderItem.findAll({
            where: { orderid: customerOrder.orderid },raw:true
          });
          return {
            orderid: customerOrder.orderid,
            customerid: customerOrder.customerid,
            customercontact: customerOrder.customercontact,
            customeraddress: customerOrder.customeraddress,
            orderstatus: customerOrder.orderstatus,
            orderitems: allItemsInCustomerOrder,
            orderdate: customerOrder.orderdate
          };
        })
      );
      if (orders.length > 0) {
        res.status(200).json({ customerOrders:orders });
      } else {
        res.status(200).json({ message: "No orders!" });
      }
    }
  } catch (error) {
    next(error);
  }
});

// Internal error handler.

router.use((error, req, res, next) => {
  console.log(error.message)
  res.status(500).json({ message: error.message });
});

module.exports = router;

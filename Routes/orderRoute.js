const express = require("express");
const CustomerOrder = require("../Models/Order");
const OrderItem = require("../Models/OrderItem");
const auth = require("../Middleware/authentication");
const router = express.Router();

// Handler to get all orders (Admin side).

router.get("/allOrders", auth, async (req, res, next) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); 
  const day = String(currentDate.getDate()).padStart(2, "0");
  const todayDate = `${year}/${month}/${day}`;
  try {
    const allOrders = await CustomerOrder.findAll({
      raw: true,
    });
    const todaysAllOrders = allOrders.map(order => {if(order.orderdate.includes(todayDate))
    {
      return order;
    }
    })
    if (allOrders) {
      const orders = await Promise.all(
        allOrders.map(async (order) => {
          const alItemsInOrder = await OrderItem.findAll({
            where: { orderid: order.orderid },
          });

          return {
            orderid: order.orderid,
            customerid:order.customerid,
            customercontact: order.customercontact,
            customeraddress: order.customeraddress,
            orderstatus: order.orderstatus,
            orderitems: alItemsInOrder,
            orderdate: order.orderdate,
          };
        })
      );
      if (orders.length > 0) {
        res.status(200).json({ orders });
      } else {
        res.status(200).json({ message: "No orders to show!" });
      }
    }
  } catch (error) {
    next(error);
  }
});

// Handler to get all Placed orders (Admin side).

router.get("/placedOrders", auth, async (req, res, next) => {
  try {
    const allPlacedOrders = await CustomerOrder.findAll({
      where: { orderstatus: "Placed" },
      raw: true,
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
            customerid:placedOrder.customerid,
            customeraddress: placedOrder.customeraddress,
            orderitems: alItemsInPlacedOrder,
            orderstatus: placedOrder.orderstatus,
            orderdate: placedOrder.orderdate,
          };
        })
      );
      if (orders.length > 0) {
        res.status(200).json({ orders });
      } else {
        res.status(200).json({ message: "No orders received to Show!" });
      }
    }
  } catch (error) {
    next(error);
  }
});

// Handler to get all orders being prepared (Admin side).

router.get("/beingPreparedOrders", auth, async (req, res, next) => {
  try {
    const allBeingPreparedOrders = await CustomerOrder.findAll({
      where: { orderstatus: "Being Prepared" },
      raw: true,
    });
    if (allBeingPreparedOrders) {
      const orders = await Promise.all(
        allBeingPreparedOrders.map(async (beingPreparedOrder) => {
          const alItemsInBeingPreparedOrder = await OrderItem.findAll({
            where: { orderid: beingPreparedOrder.orderid },
          });

          return {
            orderid: beingPreparedOrder.orderid,
            customercontact: beingPreparedOrder.customercontact,
            customerid:placedOrder.customerid,
            customeraddress: beingPreparedOrder.customeraddress,
            orderitems: alItemsInBeingPreparedOrder,
            orderstatus: beingPreparedOrder.orderstatus,
            orderdate: beingPreparedOrder.orderdate,
          };
        })
      );
      if (orders.length > 0) {
        res.status(200).json({ orders });
      } else {
        res.status(200).json({ message: "No orders being prepared!" });
      }
    }
  } catch (error) {
    next(error);
  }
});

// Handler to get all orders being delivered (Admin side).

router.get("/beingDeliveredOrders", auth, async (req, res, next) => {
  try {
    const allBeingDeliveredOrders = await CustomerOrder.findAll({
      where: { orderstatus: "Being Delivered" },
      raw: true,
    });
    if (allBeingDeliveredOrders) {
      const orders = await Promise.all(
        allBeingDeliveredOrders.map(async (beingDeliveredOrder) => {
          const alItemsInBeingDeliveredOrder = await OrderItem.findAll({
            where: { orderid: beingDeliveredOrder.orderid },
          });

          return {
            orderid: beingDeliveredOrder.orderid,
            customercontact: beingDeliveredOrder.customercontact,
            customerid:beingDeliveredOrder.customerid,
            customeraddress: beingDeliveredOrder.customeraddress,
            orderitems: alItemsInBeingDeliveredOrder,
            orderstatus: beingDeliveredOrder.orderstatus,
            orderdate: beingDeliveredOrder.orderdate,
          };
        })
      );
      if (orders.length > 0) {
        res.status(200).json({ orders });
      } else {
        res.status(200).json({ message: "No orders being delivered!" });
      }
    }
  } catch (error) {
    next(error);
  }
});

// Handler to get all delivered orders (Admin side).

router.get("/deliveredOrders", auth, async (req, res, next) => {
  try {
    const allDeliveredOrders = await CustomerOrder.findAll({
      where: { orderstatus: "Delivered" },
      raw: true,
    });
    if (allDeliveredOrders) {
      const orders = await Promise.all(
        allDeliveredOrders.map(async (deliveredOrder) => {
          const alItemsInDeliveredOrder = await OrderItem.findAll({
            where: { orderid: deliveredOrder.orderid },
          });

          return {
            orderid: deliveredOrder.orderid,
            customercontact: deliveredOrder.customercontact,
            customerid:deliveredOrder.customerid,
            customeraddress: deliveredOrder.customeraddress,
            orderitems: alItemsInDeliveredOrder,
            orderstatus: deliveredOrder.orderstatus,
            orderdate: deliveredOrder.orderdate,
          };
        })
      );
      if (orders.length > 0) {
        res.status(200).json({ orders });
      } else {
        res.status(200).json({ message: "No delivered orders to show!" });
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
      where: { orderstatus: "Cancelled" },
      raw: true,
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
            customerid:cancelledOrder.customerid,
            customeraddress: cancelledOrder.customeraddress,
            orderitems: alItemsInCancelledOrder,
            orderstatus: cancelledOrder.orderstatus,
            orderdate: cancelledOrder.orderdate,
          };
        })
      );
      if (orders.length > 0) {
        res.status(200).json({ orders });
      } else {
        res.status(200).json({ message: "No cancelled orders to show!" });
      }
    }
  } catch (error) {
    next(error);
  }
});

// Handler to change the status of the order.

router.put("/changeOrderStatus", auth, async (req, res, next) => {
  const {
    orderId,
    customerId,
    customerContact,
    customerAddress,
    orderStatus,
    orderDate,
  } = req.body;
  console.log(req.body);
  const customerOrder = {
    orderid: orderId,
    customerid: customerId,
    customercontact: customerContact,
    customeraddress: customerAddress,
    orderstatus: orderStatus,
    orderdate: orderDate,
  };
  try {
    const updated = await CustomerOrder.update(customerOrder, {
      where: {
        orderid: customerOrder.orderid,
      },
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
    orderDate,
  } = req.body;
  try {
    const order = await CustomerOrder.create({
      customerid: customerId,
      customercontact: customerContact,
      customeraddress: customerAddress,
      orderstatus: orderStatus,
      orderdate: orderDate,
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
      where: { customerid: customerId },
      raw: true,
    });
    console.log(allCustomerOrders);
    if (allCustomerOrders) {
      const orders = await Promise.all(
        allCustomerOrders.map(async (customerOrder) => {
          const allItemsInCustomerOrder = await OrderItem.findAll({
            where: { orderid: customerOrder.orderid },
            raw: true,
          });
          return {
            orderid: customerOrder.orderid,
            customerid: customerOrder.customerid,
            customercontact: customerOrder.customercontact,
            customeraddress: customerOrder.customeraddress,
            orderstatus: customerOrder.orderstatus,
            orderitems: allItemsInCustomerOrder,
            orderdate: customerOrder.orderdate,
          };
        })
      );
      if (orders.length > 0) {
        res.status(200).json({ customerOrders: orders });
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
  console.log(error.message);
  res.status(500).json({ message: error.message });
});

module.exports = router;

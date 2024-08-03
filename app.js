const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const userRoute = require("./Routes/userRoute");
const menuRoute = require("./Routes/menuRoute");
const cartRoute = require("./Routes/cartRoute");
const orderRoute = require("./Routes/orderRoute");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/user",userRoute);
app.use("/menu",menuRoute);
app.use("/cart",cartRoute);
app.use("/order",orderRoute);

app.use((req, res, next) => {
  const error = new Error("Cannot find the requested page");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status;
  res.status(status).json({
    message: error.message,
  });
});

module.exports = app;

const express = require("express");
const router = express.Router();
const Customer = require("../Models/Customer");
const AdminUser = require("../Models/AdminUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "as1WK-dmW45-adbe5-eh98F-KLa78";

// Handler to register customer's info in the server Database.

router.post("/registerCustomer", async (req, res) => {
  try {
    const { customerName, email, password, address, contact } = req.body;

    const customer = await Customer.create({
      customername: customerName,
      email,
      password,
      address,
      contact,
    });

    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).send({ message: "User registration failed" });
  }
});

// Handler to search for customer info in the database and provide auth token if found.

router.post("/loginCustomer", async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email: email }, raw:true });
    console.log(customer);
    if (!customer || !(await bcrypt.compare(password, customer.password))) {
      return res.status(401).send({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ customerid: customer.customerid }, SECRET_KEY, {
      expiresIn: "365d",
    });
    res.send({ token, customerDetails:customer });
  } catch (error) {
    res.status(500).send({ message: "Login failed" });
  }
});

// Handler to register admin user's info in the server Database.

router.post("/registerAdmin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminUser.create({
      email,
      password,
    });

    res.status(201).send({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(400).send({ message: "Admin registration failed" });
  }
});

// Handler to search for admin info in the database and provide auth token if found.

router.post("/loginAdmin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminUser.findOne({ where: { email: email } });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).send({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ adminid: admin.adminid }, SECRET_KEY, {
      expiresIn: "365d",
    });

    res.send({ authenticationToken:token });
  } catch (error) {
    res.status(500).send({ message: "Login failed!" });
  }
});

module.exports = router;

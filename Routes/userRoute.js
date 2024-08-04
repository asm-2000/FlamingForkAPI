const express = require("express");
const router = express.Router();
const SECRET_KEY = "as1WK-dmW45-adbe5-eh98F-KLa78";

// Handler to register customer's info in the server Database.

app.post("/registerCustomer", async (req, res) => {
  try {
    const { customerId, customerName, email, password, address, contact } =
      req.body;

    const customer = await Customer.create({
      customerId,
      customerName,
      email,
      password,
      address,
      contact,
    });

    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).send({ message: "User registration failed", error });
  }
});

// Handler to search for customer info in the database and provide auth token if found.

app.post("/loginCustomer", async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });

    if (!customer || !(await bcrypt.compare(password, customer.password))) {
      return res.status(401).send({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ customerId: user.customerId }, SECRET_KEY, {
      expiresIn: "10d",
    });

    res.send({ message: "Login successful", token });
  } catch (error) {
    res.status(500).send({ message: "Login failed", error });
  }
});

// Handler to register admin user's info in the server Database.

app.post("/registerAdmin", async (req, res) => {
    try {
      const { email, password } =
        req.body;
  
      const admin = await AdminUser.create({
        email,
        password,
      });
  
      res.status(201).send({ message: "Admin registered successfully" });
    } catch (error) {
      res.status(400).send({ message: "Admin registration failed", error });
    }
  });

// Handler to search for admin info in the database and provide auth token if found.

app.post("/loginAdmin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminUser.findOne({ where: { email } });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).send({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ adminId: admin.adminId }, SECRET_KEY, {
      expiresIn: "10d",
    });

    res.send({ message: "Login successful", token });
  } catch (error) {
    res.status(500).send({ message: "Login failed", error });
  }
});

module.exports = router;

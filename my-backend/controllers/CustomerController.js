const express = require('express');
const router = express.Router();

const Customer = require('../models/Customer'); // Ensure you have a Customer model defined in models/Customer.js

// Get all clients
router.get('/', async (req, res) => {
  try {
    const clients = await Customer.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single client by ID
router.get('/:id', getCustomer, (req, res) => {
  res.json(res.customer);
});

// Create a new client
router.post('/', async (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    customerID: req.body.customerID,
    contact: req.body.contact,
    email: req.body.email,
    address: req.body.address,
    branch: req.body.branch,
  });
  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a client by ID
router.put('/:id', getCustomer, async (req, res) => {
  if (req.body.name != null) {
    res.customer.name = req.body.name;
  }
  if (req.body.customerID != null) {
    res.customer.customerID = req.body.customerID;
  }
  if (req.body.contact != null) {
    res.customer.contact = req.body.contact;
  }
  if (req.body.email != null) {
    res.customer.email = req.body.email;
  }
  if (req.body.address != null) {
    res.customer.address = req.body.address;
  }
  if (req.body.branch != null) {
    res.customer.branch = req.body.branch;
  }
  try {
    const updatedCustomer = await res.customer.save();
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a client by ID
router.delete('/:id', getCustomer, async (req, res) => {
  try {
    await res.customer.remove();
    res.json({ message: 'Deleted customer' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get customer by ID
async function getCustomer(req, res, next) {
  let customer;
  try {
    customer = await Customer.findById(req.params.id);
    if (customer == null) {
      return res.status(404).json({ message: 'Cannot find customer' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.customer = customer;
  next();
}

module.exports = router;

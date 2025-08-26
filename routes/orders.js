const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

router
  .route("/")
  .get(ordersController.getAllOrders)
  .post(ordersController.createNewOrder)

module.exports = router;

const uuid = require("uuid");
const Order = require("../model/Order");

const getAllOrders = async (req, res) => {
  const orders = await Order.find({ username: req.user }).exec();
  if (!orders || !orders.length) return res.status(404).json({ message: "No orders found on this account." });
  res.json(orders);
};

const createNewOrder = async (req, res) => {
  const { products, totalCostCents } = req.body;
  if (!products || products.length === 0) {
    return res.status(400).json({ message: "Order items are required." });
  }
  
  if (!totalCostCents) {
    return res.status(400).json({ message: "Total cost is required." });
  }

  try {
    const result = await Order.create({
      _id: uuid.v4(),
      username: req.user,
      products,
      totalCostCents,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAllOrders,
  createNewOrder,
};

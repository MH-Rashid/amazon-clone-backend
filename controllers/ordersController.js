const uuid = require("uuid");
const Order = require("../model/Order");

const getAllOrders = async (req, res) => {
  const orders = await Order.find({ username: req.body.user }).exec();
  // const orders = await Order.find({ username: req.user }).exec();
  if (!orders || !orders.length) return res.status(404).json({ message: "No orders found on this account." });
  res.json(orders);
};

const createNewOrder = async (req, res) => {
  const { products, totalCostCents } = req.body;
  if (!products || products.length === 0 || !totalCostCents) {
    return res.status(400).json({ message: "Order items and total cost are required." });
  }

  try {
    const result = await Order.create({
      _id: uuid.v4(),
      username: req.body.user, // req.user once verifyJWT set up
      products: req.body.products,
      totalCostCents: req.body.totalCostCents,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const deleteOrder = async (req, res) => {
  try {
    if (!req?.body?.id) {
      return res.status(400).json({ message: "Order ID is required." });
    }

    const order = await Order.findOne({ _id: req.body.id }).exec();
    if (!order) {
      return res
        .status(404)
        .json({ message: `No order matches ID ${req.body.id}` });
    }

    await order.deleteOne();
    res
      .status(201)
      .json({ ok: true, message: `Order with ID ${req.body.id} deleted successfully.` });
  } catch (err) {
    console.error("Error deleting order:", err);
  }
};

module.exports = {
  getAllOrders,
  createNewOrder,
  deleteOrder,
};

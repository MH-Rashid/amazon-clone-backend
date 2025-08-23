const Product = require("../model/Product.js");

const getAllProducts = async (req, res) => {
  const products = await Product.find().exec();
  if (!products) return res.status(404).json({ message: "No products found." });
  res.json(products);
};

module.exports = { getAllProducts };

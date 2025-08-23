const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  _id: { type: String, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  rating: {
    stars: { type: Number, required: true },
    count: { type: Number, required: true },
  },
  priceCents: { type: Number, required: true },
  keywords: [{ type: String, required: true }],
});

module.exports = mongoose.model('Product', productSchema);
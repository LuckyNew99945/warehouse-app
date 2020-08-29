const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    username: { type: String, required: true },
    productname: { type: String, required: true },
    description: { type: String, required: true },
    width: { type: Number, required: true },
    length: { type: Number, required: true },
    thickness: { type: Number, required: true },
    expired: { type: Date, required: false },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
